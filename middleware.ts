import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

function isValidToken(req: Request, res: Response, next: NextFunction) {
  const [bearer, token] = req.headers.authorization?.split(" ") || [];

  if (!token || bearer !== "Bearer") {
    return res.status(401).json({
      error: "Token não encontrado",
    });
  }

  try {
    jwt.verify(token, process.env.SECRET_KEY!);

    next();
  } catch (error) {
    return res.status(401).json({
      error: "Token inválido",
    });
  }
}

export default isValidToken;
