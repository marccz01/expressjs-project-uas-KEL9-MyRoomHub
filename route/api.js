import express from "express";
import * as userController from "../controllers/userController.js";
import * as bookingController from "../controllers/bookingController.js";
import { authenticateTokenMiddleware } from "../middleware/authenticateTokenMiddleware.js";

const api = express.Router()

api.post ("/signup", userController.signUp)
api.post("/signin", userController.signIn)

api.post("/booking", authenticateTokenMiddleware, bookingController.CreateBooking)
api.get("/booking", authenticateTokenMiddleware, bookingController.ListBooking)
api.put("/booking/:id", authenticateTokenMiddleware, bookingController.updateBooking)
api.delete("/booking/:id", authenticateTokenMiddleware, bookingController.deleteBooking)
api.get("/booking/:id", authenticateTokenMiddleware, bookingController.detailBooking)

export default api