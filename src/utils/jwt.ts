import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-default-secret-key'; // Fallback for safety

export const generateToken = (userId: string): string => {
  if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in environment variables.');
  }
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '1h' });
};

export const verifyToken = (token: string): { userId: string } | null => {
  if (!JWT_SECRET) {
    console.error('JWT_SECRET is not defined. Cannot verify token.');
    return null;
  }
  try {
    return jwt.verify(token, JWT_SECRET) as { userId: string };
  } catch (error) {
    console.error('Invalid token:', error);
    return null;
  }
}; 