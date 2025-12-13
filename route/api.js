import express from "express";
import * as userController from "../controllers/userController.js";


const api = express.Router()

api.post ("/signup", userController.signUp)
api.post("/signin", userController.signIn)

export default api