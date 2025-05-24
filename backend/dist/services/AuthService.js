"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const User_1 = require("../models/User");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthService {
    static async register(name, email, password) {
        const existingUser = await User_1.User.findOne({ email });
        if (existingUser) {
            throw new Error("User already exist");
        }
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const user = new User_1.User({ name, email, password: hashedPassword });
        await user.save();
        return user;
    }
    static async login(email, password) {
        const user = await User_1.User.findOne({ email });
        if (!user) {
            throw new Error("Invalid email or password");
        }
        const isPasswordValid = await bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error("Invalid email or password");
        }
        const token = jsonwebtoken_1.default.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });
        return { token, user };
    }
}
exports.AuthService = AuthService;
