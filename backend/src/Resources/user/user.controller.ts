import { Router, Request, Response, NextFunction } from "express";
import Controller from "../../utils/interfaces/controller.interface";
import HttpException from "../../utils/exceptions/http.exception";
import UserService from "../../Resources/user/user.service";
import validationMiddleware from "../../middleware/validation.middleware";
import validate from "../../Resources/user/user.validation";
import authenticated from "../../middleware/auth.middleware";
import IUser from "./user.interface";

/**
 * This is the user controller class
 */
class UserController implements Controller {
  public path = "/users";
  public router = Router();
  private UserService = new UserService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(
      `${this.path}/register`,
      validationMiddleware(validate.register),
      this.register
    );
    this.router.post(
      `${this.path}/login`,
      validationMiddleware(validate.login),
      this.login
    );
    this.router.get(`${this.path}/me`, authenticated, this.me);
    this.router.post(
      `${this.path}/preferences`,
      authenticated,
      this.setPreferences
    );
    this.router.get(
      `${this.path}/preferences`,
      authenticated,
      this.getPreferrences
    );
    this.router.post(`${this.path}/dummy`, this.DummyFunction);
  }

  private register = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { name, email, password, userPreferences  } = req.body;
      const token = await this.UserService.registerUser(
        name,
        email,
        password,
        userPreferences,
        "user"
      );

      return res.status(201).json({ token });
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };

  private login = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { email, password } = req.body;
      const token = await this.UserService.loginUser(email, password);
      return res
        .cookie("access_token", token, {
          httpOnly: true,
          secure: false,
          sameSite: "none",
        })
        .status(200)
        .json({ token });
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };

  private me = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      if (!req.user) {
        next(new HttpException(400, "User not found"));
      }
      return res.status(200).json({ user: req.user });
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };

  private setPreferences = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { preferences } = req.body;

      if (!req.user) {
        return next(new HttpException(400, "User not found"));
      }

      const user: IUser | Error = await this.UserService.updatePreferences(
        req.user,
        preferences
      );

      if (user instanceof Error) {
        return next(new HttpException(400, user.message));
      }

      return res.status(200).json({ preferences: user.userPreferences });
    } catch (error: any) {
      return next(new HttpException(400, error.message));
    }
  };

  private DummyFunction = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    console.log(req.body);

    return res.status(200).json({ message: "Dummy function" });
    // interect with database
  };

  private getPreferrences = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      if (!req.user) {
        return next(new HttpException(400, "User not found"));
      }

      return res.status(200).json({ preferences: req.user.userPreferences });
    } catch (error: any) {
      return next(new HttpException(400, error.message));
    }
  };
}

export default UserController;
