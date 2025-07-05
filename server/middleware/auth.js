import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import dotenv from 'dotenv';
dotenv.config(); // This must be near the top BEFORE any other env usage

export const verifyToken = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const verified = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from token
      req.user = await User.findById(verified.id).select('-password');
      return next();

    } catch (err) {
      console.error("JWT verification error:", err);
      return res.status(401).json({ error: 'Invalid token' });
    }
  }

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }
};
