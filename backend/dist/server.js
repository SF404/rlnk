"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const urlshort_routes_1 = __importDefault(require("./routes/urlshort.routes"));
const url_controller_1 = require("./controller/url.controller");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
app.use(body_parser_1.default.json());
app.use("/auth", auth_routes_1.default);
app.use("/url", urlshort_routes_1.default);
app.get("/:short", url_controller_1.getFullUrl);
// connect database
const MONGODB_URI = process.env.MONGODB_URI;
mongoose_1.default
    .connect(MONGODB_URI, {})
    .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
    .catch((error) => {
    console.error("Failed to connect to MongoDB", error);
});
