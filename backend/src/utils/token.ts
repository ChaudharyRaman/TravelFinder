import jwt from "jsonwebtoken";
import Token from "./interfaces/token.interface";
import IUser from "../Resources/user/user.interface";

/**
 * 
 * @param user - IUser
 * @returns - string Token
 */
const createToken = (user: IUser): string => {
  const expiresIn = 60 * 60 * 60;
  const secret = process.env.JWT_SECRET;
  //   const dataStoredInToken: Token = {
  //     id: user._id,
  //     expiresIn: expiresIn,
  //   };
  return jwt.sign({ id: user._id }, secret as jwt.Secret, {
    expiresIn: expiresIn,
  });
};

const verifyToken = async (
  token: string
): Promise<jwt.VerifyErrors | Token> => {
  const secret = process.env.JWT_SECRET;
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret as jwt.Secret, (err, decoded) => {
      if (err) return reject(err);
      resolve(decoded as Token);
    });
  });
};

export default { createToken, verifyToken };
