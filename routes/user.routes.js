import express from "express";
import { authenticate } from '../middlewares/auth.js';
import { getUserProfile,logoutUser, registerUser, loginUser,getregister, getlogin } from "../controllers/userController.js";

const router = express.Router();


router.get('/profile', authenticate, getUserProfile);
router.get("/register",getregister);
router.get("/login",getlogin);


router.post("/register", registerUser);
router.post("/login", loginUser);
router.get('/logout', logoutUser); 


export default router;
