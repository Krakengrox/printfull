import { Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';
import { Request as ExpressRequest } from 'express'; // Alias to avoid conflict

// Extend Express Request type
export interface AuthRequest extends ExpressRequest {
  userId?: string;
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authorization header missing or malformed (Bearer token expected)' });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    // This case should ideally be caught by the startsWith check, but as a safeguard:
    return res.status(401).json({ message: 'Token missing from Authorization header' });
  }

  try {
    const decoded = verifyToken(token);
    if (!decoded || !decoded.userId) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }
    req.userId = decoded.userId;
    next();
  } catch (error) {
    // Catching potential errors from jwt.verify if not handled inside verifyToken
    console.error("Auth middleware error:", error);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}; 