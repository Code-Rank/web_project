import express from "express";
import * as auth from "../../controllers/auth/authController.js";
const router=express.Router();



router.post("/signup",auth.signup);
router.post("/login",auth.login);

export default router;



