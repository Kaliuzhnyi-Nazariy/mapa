import { Router } from "express";
import { isAuthenticated } from "../middlewares";
import ctrl from "../controllers/user";

const router = Router();

router.get("/me", isAuthenticated, ctrl.getUser);

router.delete("/", isAuthenticated, ctrl.deleteUser);

router.put("/update", isAuthenticated, ctrl.updateUser);

router.patch("/password", isAuthenticated, ctrl.updatePassword);

export default router;
