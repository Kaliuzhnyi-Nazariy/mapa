import db from "../db/db";
import { errorHandler } from "../helpers";

const getMarkersService = async (id: string) => {
  const { rows } = await db.query(
    "SELECT * FROM Map_markers WHERE owner_id = $1",
    [id],
  );

  return { data: rows };
};

const addMarkerService = async ({
  markerName,
  position,
  id,
}: {
  markerName: string;
  position: string;
  id: string;
}) => {
  const newMarker = await db.query(
    "INSERT INTO Map_markers (name, position, owner_id) VALUES ($1, $2, $3) RETURNING *",
    [markerName, position, id],
  );

  if (!newMarker) {
    throw errorHandler(500);
  }

  return { data: newMarker.rows[0] };
};

const deleteMarkerService = async ({
  markerId,
  id,
}: {
  markerId: string;
  id: string;
}) => {
  const isMarker = await db.query(
    "SELECT * FROM Map_markers WHERE id=$1 AND owner_id=$2 ",
    [markerId, id],
  );

  if (isMarker.rows.length == 0) {
    throw errorHandler(404);
  }

  const { rows } = await db.query(
    "DELETE FROM Map_markers WHERE id=$1 AND owner_id=$2 RETURNING *",
    [markerId, id],
  );

  return { data: rows[0] };
};

const updateMarkerService = async ({
  markerId,
  id,
  markerName,
  position,
}: {
  markerId: string;
  id: string;
  markerName: string;
  position: string;
}) => {
  const isMarker = await db.query(
    "SELECT * FROM Map_markers WHERE id=$1 AND owner_id=$2 ",
    [markerId, id],
  );

  if (isMarker.rows.length == 0) {
    throw errorHandler(404);
  }

  // console.log({ markerName, position, id, markerId });

  const { rows } = await db.query(
    "UPDATE Map_markers SET name=$1, position=$2 WHERE owner_id=$3 AND id=$4 RETURNING *",
    [markerName, position, id, markerId],
  );

  if (rows.length === 0) {
    throw errorHandler(400);
  }

  return { data: rows[0] };
};

export {
  getMarkersService,
  addMarkerService,
  deleteMarkerService,
  updateMarkerService,
};
