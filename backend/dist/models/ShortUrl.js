"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShortUrl = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const shortUrlSchema = new mongoose_1.default.Schema({
    full: { type: String, required: true },
    short: { type: String, required: true },
    userId: { type: mongoose_1.default.Schema.ObjectId, required: true },
    clicks: { type: Number, default: 0 }
});
exports.ShortUrl = mongoose_1.default.model('ShortUrl', shortUrlSchema);
