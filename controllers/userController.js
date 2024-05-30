import { insertUser,findUserById, findUserByUsername } from "../models/db.js";

import bcrypt from 'bcrypt';

import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';


dotenv.config();




export const getUserProfile = async (req, res) => {
  try {
    const user = req.user; // Now req.user contains the user object
    res.render('profile', { user });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving user profile');
  }
};
export const getregister = (req,res)=>{
  res.render("register");
}
export const getlogin = (req,res)=>{
  res.render("login");
}


export const registerUser = async (req, res) => {
  const { username, password, email, role } = req.body;
  try {
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
      
      // Insert user with specified role
      await insertUser(username, hashedPassword, email, role);
      
      // Redirect to login page
      res.redirect('/users/login');
  } catch (error) {
      // Handle registration error
      console.error(error);
      res.status(500).send('Error registering user');
  }
};


export const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await findUserByUsername(username);
    
    if (!user) {
      return res.status(400).send('Invalid username or password');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send('Invalid username or password');
    }
    
    // Set req.user.id here if needed
    req.user = { id: user.id }; // Set the user ID in the request object
    console.log(req.user.id)

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true });
    res.redirect('/users/profile');
  } catch (error) {
    res.status(500).send('Error logging in');
  }
};


export const logoutUser = (req, res) => {
  res.clearCookie('token'); // Clear the authentication token cookie
  
  res.redirect('/users/login'); // Redirect to login page
};


