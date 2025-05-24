"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStats = exports.updateUrl = exports.deleteUrl = exports.getUserUrls = exports.getFullUrl = exports.saveUrl = void 0;
const UrlShortService_1 = require("../services/UrlShortService");
const saveUrl = async (req, res) => {
    const { full } = req.body;
    const userId = req.user._id;
    if (!full) {
        res.status(400).json({ message: "Full URL is required" });
        return;
    }
    try {
        const shortUrl = await UrlShortService_1.UrlShortService.saveUrl(full, userId);
        res.status(201).json(shortUrl);
    }
    catch (error) {
        console.error("Error saving URL:", error);
        res.status(500).json({ message: error.message });
    }
};
exports.saveUrl = saveUrl;
const getFullUrl = async (req, res) => {
    const { short } = req.params;
    try {
        const fullUrl = await UrlShortService_1.UrlShortService.getUrl(short);
        return res.redirect(fullUrl);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
};
exports.getFullUrl = getFullUrl;
const getUserUrls = async (req, res) => {
    try {
        const urls = await UrlShortService_1.UrlShortService.getUserUrls(req.user._id);
        res.status(200).json(urls);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getUserUrls = getUserUrls;
const deleteUrl = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await UrlShortService_1.UrlShortService.deleteUrl(id, req.user._id);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
};
exports.deleteUrl = deleteUrl;
const updateUrl = async (req, res) => {
    const { id } = req.params;
    const { full } = req.body;
    if (!full) {
        res.status(400).json({ message: "Full URL is required" });
        return;
    }
    try {
        const updated = await UrlShortService_1.UrlShortService.updateUrl(id, full, req.user._id);
        res.status(200).json(updated);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
};
exports.updateUrl = updateUrl;
const getStats = async (req, res) => {
    try {
        const stats = await UrlShortService_1.UrlShortService.getStats(req.user._id);
        res.status(200).json(stats);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getStats = getStats;
