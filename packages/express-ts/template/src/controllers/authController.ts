import { Request, Response, NextFunction } from "express";

const login = async (req: Request, res: Response, next: NextFunction) => {
  // Your login logic
  res.send("Logged in");
};

const logout = async (req: Request, res: Response, next: NextFunction) => {
  // Your logout logic
  res.send("Logged out");
};

export default { login, logout };
