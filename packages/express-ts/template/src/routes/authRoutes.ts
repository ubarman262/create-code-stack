import express, { Request, Response, NextFunction } from "express";
import authController from "../controllers/authController"; // Ensure this is the correct path
import { verifyToken } from "../middleware/authMiddleware"; // Ensure this is the correct path

const router = express.Router();

router.post("/login", (req: Request, res: Response, next: NextFunction) => {
  authController.login(req, res, next);
});

router.post(
  "/logout",
  verifyToken,
  (req: Request, res: Response, next: NextFunction) => {
    authController.logout(req, res, next);
  }
);

export default router;
