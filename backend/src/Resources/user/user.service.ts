import userModel from "./user.model";
import token from "../../utils/token";
import IUser, { IPreferences } from "./user.interface";

class UserService {
  private user = userModel;

  /**
   * Register User
   * @param name - string
   * @param email - string
   * @param password - string
   * @param role - string
   * @returns - Token (string | Error)
   */
  public async registerUser(
    name: string,
    email: string,
    password: string,
    userPreferences: IPreferences,
    role: string
  ): Promise<string | Error> {
    try {
      const user = await this.user.create({
        name,
        email,
        password,
        role,
        userPreferences,
      });
      const accessToken = token.createToken(user);
      return accessToken;
    } catch (error) {
      throw new Error("Unable To Register User");
      // throw new Error(error.message);
    }
  }

  /**
   * Login User
   * @param email string
   * @param password string
   * @returns Toekn (string | Error)
   */
  public async loginUser(
    email: string,
    password: string
  ): Promise<string | Error> {
    try {
      const user = await this.user.findOne({ email });

      if (!user) {
        throw new Error("User Not Found");
      }
      if (await user.isValidPassword(password)) {
        return token.createToken(user);
      } else {
        throw new Error("Wrong Credentials Given");
      }
    } catch (error) {
      throw new Error("Unable To Login User");
    }
  }

  /**
   * Get User Preferences
   * @param user IUser
   * @returns IUser
   */
  public async updatePreferences(
    user: IUser,
    preferences: IPreferences
  ): Promise<IUser | Error> {
    try {
      const newUser = await this.user.findByIdAndUpdate(
        user?._id,
        { userPreferences: preferences },
        { new: true }
      );
      if (!newUser) {
        throw new Error("User Not Found");
      }
      return newUser;
    } catch (error) {
      throw new Error("Unable To Update Preferences");
    }
  }
}

export default UserService;
