"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const AuthService_1 = require("../services/AuthService");
const register = async (req, res) => {
    const { email, password, name } = req.body;
    if (!name || !email || !password)
        res
            .status(403)
            .json({ message: "Name, email, and password are required." });
    try {
        await AuthService_1.AuthService.register(name, email, password);
        res.status(201).json({ message: "User registered successfully" });
    }
    catch (error) {
        console.error("Registeration error: ", error);
        res.status(500).json({ message: error.message || "Internal server error" });
    }
};
exports.register = register;
const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(403).json({ message: "email and password are required" });
    }
    try {
        const { token, user } = await AuthService_1.AuthService.login(email, password);
        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });
    }
    catch (error) {
        console.error("Login error: ", error);
        res.status(401).json({ message: error.message || "Invalid credentials" });
    }
};
exports.login = login;
