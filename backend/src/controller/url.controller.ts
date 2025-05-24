import { Request, Response } from "express";
import { UrlShortService } from "../services/UrlShortService";
import { IUser } from "../types/user";

interface UrlRequest extends Request {
  user: IUser;
}

export const saveUrl = async (req: UrlRequest, res: Response): Promise<void> => {
  const { full } = req.body;
  const userId = req.user._id;

  if (!full) {
     res.status(400).json({ message: "Full URL is required" });
     return;
  }

  try {
    const shortUrl = await UrlShortService.saveUrl(full, userId);
    res.status(201).json(shortUrl);
  } catch (error: any) {
    console.error("Error saving URL:", error);
    res.status(500).json({ message: error.message });
  }
};

export const getFullUrl = async (req: Request, res: Response): Promise<void> => {
  const { short } = req.params;

  try {
    const fullUrl = await UrlShortService.getUrl(short);
    return res.redirect(fullUrl);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

export const getUserUrls = async (req: UrlRequest, res: Response): Promise<void> => {
  try {
    const urls = await UrlShortService.getUserUrls(req.user._id);
    res.status(200).json(urls);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteUrl = async (req: UrlRequest, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const result = await UrlShortService.deleteUrl(id, req.user._id);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

export const updateUrl = async (req: UrlRequest, res: Response): Promise<void> => {
  const { id } = req.params;
  const { full } = req.body;

  if (!full) {
    res.status(400).json({ message: "Full URL is required" });
    return;
  }

  try {
    const updated = await UrlShortService.updateUrl(id, full, req.user._id);
    res.status(200).json(updated);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

export const getStats = async (req: UrlRequest, res: Response): Promise<void> => {
  try {
    const stats = await UrlShortService.getStats(req.user._id);
    res.status(200).json(stats);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
