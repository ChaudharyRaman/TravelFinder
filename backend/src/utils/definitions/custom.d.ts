import IUser from '../../Resources/user/user.interface'; // Import your User interface

declare module 'express' {
  export interface Request {
    user?: IUser; // Add the custom `user` property
  }
}
