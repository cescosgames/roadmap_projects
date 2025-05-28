// our fetch weather router
import express from "express";
const router = express.Router();

// our controller
import { getWeather } from "../controllers/weatherController.js";

// async request, handled in our weather controller
router.get('/:city', getWeather);

export default router