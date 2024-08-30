import { config } from 'dotenv';
config();
// import 'module-alias';
import App from './app';
import validateEnv from './utils/validateEnv';
import UserController from './Resources/user/user.controller';
import RecommendationController from './Resources/recommendation/recommendation.controller';

validateEnv();

const app = new App([
    new UserController(),
    new RecommendationController()
],Number(process.env.PORT));

app.listen();