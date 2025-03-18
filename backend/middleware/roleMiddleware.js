import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

// Middleware to check if the user is an admin
const roleMiddleware = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
//   console.log("Received Token:", token);

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
//   // Decode the token without verification
//   const decoded = jwt.decode(token);
//   console.log("Decoded Token:", decoded);

//   if (!decoded) {
//     return res.status(401).json({ error: 'Invalid token format' });
//   }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the user is an admin
    if (user.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Forbidden: Admins only' });
    }

    // Attach the user to the request object
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

export default roleMiddleware;
