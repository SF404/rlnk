"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UrlShortService = void 0;
const shortid_1 = __importDefault(require("shortid"));
const ShortUrl_1 = require("../models/ShortUrl");
class UrlShortService {
    static async saveUrl(full, userId) {
        try {
            const short = shortid_1.default.generate();
            const shortUrl = new ShortUrl_1.ShortUrl({ full, short, userId });
            await shortUrl.save();
            return shortUrl;
        }
        catch (error) {
            throw new Error(error.message || "Failed to save URL");
        }
    }
    static async getUrl(short) {
        try {
            const shortUrl = await ShortUrl_1.ShortUrl.findOne({ short });
            if (!shortUrl)
                throw new Error("Short URL not found");
            shortUrl.clicks++;
            await shortUrl.save();
            return shortUrl.full;
        }
        catch (error) {
            throw new Error(error.message || "Error fetching short URL");
        }
    }
    static async getUserUrls(userId) {
        try {
            const urls = await ShortUrl_1.ShortUrl.find({ userId });
            return urls;
        }
        catch (error) {
            throw new Error("Failed to fetch user URLs");
        }
    }
    static async deleteUrl(id, userId) {
        try {
            const url = await ShortUrl_1.ShortUrl.findOneAndDelete({ _id: id, userId });
            if (!url) {
                throw new Error("URL not found or unauthorized");
            }
            return { message: "URL deleted successfully" };
        }
        catch (error) {
            throw new Error(error.message || "Error deleting URL");
        }
    }
    static async updateUrl(id, full, userId) {
        try {
            const updated = await ShortUrl_1.ShortUrl.findOneAndUpdate({ _id: id, userId }, { full }, { new: true });
            if (!updated) {
                throw new Error("URL not found or unauthorized");
            }
            return updated;
        }
        catch (error) {
            throw new Error(error.message || "Error updating URL");
        }
    }
    static async getStats(userId) {
        try {
            const urls = await ShortUrl_1.ShortUrl.find({ userId });
            const totalClicks = urls.reduce((sum, url) => sum + url.clicks, 0);
            return {
                totalUrls: urls.length,
                totalClicks,
            };
        }
        catch (error) {
            throw new Error("Failed to get statistics");
        }
    }
}
exports.UrlShortService = UrlShortService;
