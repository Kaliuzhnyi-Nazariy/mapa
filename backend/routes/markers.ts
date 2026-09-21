import { Router } from "express";
import { isAuthenticated } from "../middlewares";
import ctr from "../controllers/marker";

const router = Router();

router.get("/", isAuthenticated, ctr.getMarkers);

router.post("/add", isAuthenticated, ctr.addMarker);

router.put("/:markerId", isAuthenticated, ctr.updateMarker);

router.delete("/all", isAuthenticated, ctr.deleteAllMarkers);

router.delete("/:markerId", isAuthenticated, ctr.deleteMarker);

export default router;
