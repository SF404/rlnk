import { User } from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class AuthService {
  static async register(name: string, email: string, password: string) {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("User already exist");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    return user;
  }

  static async login(email: string, password: string) {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Invalid email or password");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });

    return { token, user };
  }
}
