import { NextFunction, Request, Response } from "express";
import { ctrlWrapper, errorHandler } from "../helpers";
import { UserRequest } from "../middlewares/authenticated";
import db from "../db/db";

const addMarker = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = (req as unknown as UserRequest).user;

  const { markerName, position } = req.body;

  const newMarker = await db.query(
    "INSERT INTO Map_markers (name, position, owner_id) VALUES ($1, $2, $3) RETURNING *",
    [markerName, position, id]
  );

  if (!newMarker) {
    return next(errorHandler(500));
  }

  res.status(201).json(newMarker.rows);
};

const getMarkers = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = (req as unknown as UserRequest).user;

  const userMarkers = await db.query(
    "SELECT * FROM Map_markers WHERE owner_id = $1",
    [id]
  );

  res.status(200).json(userMarkers.rows);
};

const deleteMarker = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = (req as unknown as UserRequest).user;

  const { markerId } = req.params;

  const isMarker = await db.query(
    "SELECT * FROM Map_markers WHERE id=$1 AND owner_id=$2 ",
    [markerId, id]
  );

  if (isMarker.rows.length == 0) {
    return next(errorHandler(404));
  }

  const { rows } = await db.query(
    "DELETE FROM Map_markers WHERE id=$1 AND owner_id=$2 RETURNING *",
    [markerId, id]
  );

  res.status(200).json(rows[0]);
};

const updateMarker = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = (req as unknown as UserRequest).user;

  const { markerId } = req.params;

  const isMarker = await db.query(
    "SELECT * FROM Map_markers WHERE id=$1 AND owner_id=$2 ",
    [markerId, id]
  );

  if (isMarker.rows.length == 0) {
    return next(errorHandler(404));
  }

  const { markerName, position } = req.body;

  // console.log({ markerName, position, id, markerId });

  const { rows } = await db.query(
    "UPDATE Map_markers SET name=$1, position=$2 WHERE owner_id=$3 AND id=$4 RETURNING *",
    [markerName, position, id, markerId]
  );

  if (rows.length === 0) {
    return next(errorHandler(400));
  }

  res.status(200).json(rows[0]);
};

export default {
  addMarker: ctrlWrapper(addMarker),
  getMarkers: ctrlWrapper(getMarkers),
  deleteMarker: ctrlWrapper(deleteMarker),
  updateMarker: ctrlWrapper(updateMarker),
};
