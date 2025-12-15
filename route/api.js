import express from "express";
import * as userController from "../controllers/userController.js";
import * as bookingController from "../controllers/bookingController.js";
import { authenticateTokenMiddleware } from "../middlewares/authenticateTokenMiddleware.js";

const api = express.Router()

api.post ("/signup", userController.signUp)
api.post("/signin", userController.signIn)

api.post("/booking", authenticateTokenMiddleware, bookingController.addNewBooking)
api.get("/booking", authenticateTokenMiddleware, bookingController.booking)
api.get("/booking/:id", authenticateTokenMiddleware, bookingController.detailBooking)
api.put("/boooking/:id", authenticateTokenMiddleware, bookingController.updateBooking)
api.delete("/booking/:id", authenticateTokenMiddleware, bookingController.deleteBooking)

export default api