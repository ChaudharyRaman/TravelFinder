import { Document } from "mongoose";

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: string;

  isValidPassword(password: string): Promise<Error | boolean>;
  userPreferences?: IPreferences;
}

export interface IPreferences {
    budget: string;
    interests: string[];
    location: string;
    duration: number;
}

export default IUser;
