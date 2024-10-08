import express, { Application } from "express";
import mongoose from "mongoose";
import cors from "cors";
import Controller from "./utils/interfaces/controller.interface";
import ErrorMiddleware from "./middleware/error.middleware";
import helmet from "helmet";
import HttpException from "./utils/exceptions/http.exception";
import cookieParser from "cookie-parser";

class App {
  public express: Application;
  public port: number;

  constructor(controllers: Controller[], port: number) {
    this.express = express();
    this.port = port;

    this.initialiseDatabaseConnection();
    this.initialeseMiddleware();
    this.initialeseControllers(controllers);
    this.initialeseErrorHandling();
  }

  private initialeseMiddleware(): void {
    this.express.use(helmet());
    this.express.use(
      cors({
        origin: "*",
        credentials: true,
        methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
      })
    );
    this.express.use(express.json());
    this.express.use(cookieParser());
    this.express.use(express.urlencoded({ extended: false }));
  }
  private initialeseControllers(controllers: Controller[]): void {
    controllers.forEach((controller) => {
      this.express.use("/api", controller.router);
    });
  }

  private initialeseErrorHandling(): void {
    this.express.use(ErrorMiddleware);
  }
  private async initialiseDatabaseConnection(): Promise<void> {
    mongoose.set("strictQuery", false);
    try {
      await mongoose.connect(`${process.env.MONGO_URI}`);
      console.log("Database connected");
    } catch (error: any) {
      console.log(error.message);
      throw new HttpException(500, "Database connection failed");
    }
  }

  public listen(): void {
    this.express.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }
}

export default App;
