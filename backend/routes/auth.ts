import { Router } from "express";
import ctrl from "../controllers/auth";
import { isAuthenticated } from "../middlewares";

const router = Router();

router.post("/signup", ctrl.signup);

router.post("/signin", ctrl.signin);

router.post("/signout", isAuthenticated, ctrl.signout);

export default router;
