import { Router } from "express";
import analyzeController from "../controllers/analyze.controller.js";

const analyzeRouter = Router();

analyzeRouter.post("/analyze", analyzeController);

export default analyzeRouter;
