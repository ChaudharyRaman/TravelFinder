import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
import IUser from "../../Resources/user/user.interface"
const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
    },
    userPreferences: {
      budget: {
        type: Number,
      },
      interests: {
        type: [String],
      },
      location: {
        type: String,
      },
      duration: {
        type: Number,
      },
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();
});

UserSchema.methods.isValidPassword = async function (
  password: string
): Promise<Error | boolean> {
  try {
    const user = this as IUser;
    const compare = await bcrypt.compare(password, user.password);
    return compare;
  } catch (error: any) {
    throw new Error(error);
  }
};

export default model<IUser>("User", UserSchema);
