import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { findUserById ,getItemById} from '../models/db.js'; // Import your user model function

dotenv.config();




export const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.token; // Assuming the token is stored in a cookie
    if (!token) {
      return res.status(401).send('Unauthorized');
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await findUserById(decoded.id); // Assuming findUserById retrieves the user by ID
    if (!user) {
      return res.status(401).send('Unauthorized');
    }
    req.user = user; // Set the user object in req.user
    next();
  } catch (error) {
    return res.status(401).send('Unauthorized');
  }
};



export const checkOwnershipOrAdmin = async (req, res, next) => {
  try {
    const userId = req.user.id; // Assuming req.user is populated after authentication
    const itemId = req.params.id;

    const item = await getItemById(itemId); // Fetch the item from the database
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    const user = await findUserById(userId); // Fetch the user from the database
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.role === 'admin' || item.owner_id === userId) {
      return next();
    } else {
      return res.status(403).json({ message: 'Forbidden: You do not have permission to perform this action' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};