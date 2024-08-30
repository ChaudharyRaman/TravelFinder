import { Router, Request, Response, NextFunction } from "express";
import Controller from "../../utils/interfaces/controller.interface";
import RecommendationService from "./recommendation.service";
import HttpException from "../../utils/exceptions/http.exception";
import authenticatedMiddleware from "../../middleware/auth.middleware";
import { InputRecommendation } from "./recommendation.interface";

class RecommendationController implements Controller {
  public path = "/recommend";
  public router = Router();
  private recommendationService = new RecommendationService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get(
      `${this.path}/`,
      authenticatedMiddleware,
      this.getUserDataRecommendation
    );
    this.router.post(
      `${this.path}/`,
      authenticatedMiddleware,
      this.getInputDataRecommendation
    );
  }

  // Route handler for getting recommendations
  private getUserDataRecommendation = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      if (!req.user) {
        return next(new HttpException(400, "User not found"));
      }

      const inputData: InputRecommendation = {
        location: req.user.userPreferences?.location ?? "Any Location",
        interests: req.user.userPreferences?.interests ?? [],
        budget: req.user.userPreferences?.budget ?? "Any Budget",
      };
      const recommendations =
        await this.recommendationService.getRecommendation(inputData); // Assuming req.user exists
      res.status(200).json(recommendations);
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };
  private getInputDataRecommendation = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      if (!req.user) {
        return next(new HttpException(400, "User not found"));
      }
      const recommendations =
        await this.recommendationService.getRecommendation(
          req.body as InputRecommendation
        ); // Assuming req.user exists
      res.status(200).send(recommendations);
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };
}

export default RecommendationController;
