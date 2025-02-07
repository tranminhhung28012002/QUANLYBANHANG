import { Router } from "express";
import { getUserReviewBookController } from "../controllers/reviewController.js";

const ReviewRouter = Router();
ReviewRouter.get("/Review/:BookID", getUserReviewBookController);
export default ReviewRouter;
