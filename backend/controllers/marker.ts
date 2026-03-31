import { NextFunction, Request, Response } from "express";
import { ctrlWrapper, errorHandler } from "../helpers";
import { UserRequest } from "../middlewares/authenticated";
import db from "../db/db";
import {
  addMarkerService,
  deleteMarkerService,
  getMarkersService,
  updateMarkerService,
} from "../service/marker";

const addMarker = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = (req as unknown as UserRequest).user;

  const { markerName, position } = req.body;

  const { data } = await addMarkerService({ id, markerName, position });

  res.status(201).json(data);
};

const getMarkers = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = (req as unknown as UserRequest).user;

  const { data } = await getMarkersService(id);

  res.status(200).json(data);
};

const deleteMarker = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = (req as unknown as UserRequest).user;

  const { markerId } = req.params;

  const { data } = await deleteMarkerService({ markerId, id });

  res.status(200).json(data);
};

const updateMarker = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = (req as unknown as UserRequest).user;

  const { markerId } = req.params;
  const { markerName, position } = req.body;

  // const isMarker = await db.query(
  //   "SELECT * FROM Map_markers WHERE id=$1 AND owner_id=$2 ",
  //   [markerId, id],
  // );

  // if (isMarker.rows.length == 0) {
  //   return next(errorHandler(404));
  // }

  // const { markerName, position } = req.body;

  // // console.log({ markerName, position, id, markerId });

  // const { rows } = await db.query(
  //   "UPDATE Map_markers SET name=$1, position=$2 WHERE owner_id=$3 AND id=$4 RETURNING *",
  //   [markerName, position, id, markerId],
  // );

  // if (rows.length === 0) {
  //   return next(errorHandler(400));
  // }

  const { data } = await updateMarkerService({
    markerId,
    id,
    markerName,
    position,
  });

  res.status(200).json(data);
};

export default {
  addMarker: ctrlWrapper(addMarker),
  getMarkers: ctrlWrapper(getMarkers),
  deleteMarker: ctrlWrapper(deleteMarker),
  updateMarker: ctrlWrapper(updateMarker),
};
