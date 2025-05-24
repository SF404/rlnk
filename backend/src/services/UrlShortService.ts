import shortid from "shortid";
import { ShortUrl } from "../models/ShortUrl";

export class UrlShortService {
  static async saveUrl(full: string, userId: string) {
    try {
      const short = shortid.generate();
      const shortUrl = new ShortUrl({ full, short, userId });
      await shortUrl.save();
      return shortUrl;
    } catch (error: any) {
      throw new Error(error.message || "Failed to save URL");
    }
  }

  static async getUrl(short: string) {
    try {
      const shortUrl = await ShortUrl.findOne({ short });
      if (!shortUrl) throw new Error("Short URL not found");

      shortUrl.clicks++;
      await shortUrl.save();

      return shortUrl.full;
    } catch (error: any) {
      throw new Error(error.message || "Error fetching short URL");
    }
  }

  static async getUserUrls(userId: string) {
    try {
      const urls = await ShortUrl.find({ userId });
      return urls;
    } catch (error: any) {
      throw new Error("Failed to fetch user URLs");
    }
  }

  static async deleteUrl(id: string, userId: string) {
    try {
      const url = await ShortUrl.findOneAndDelete({ _id: id, userId });
      if (!url) {
        throw new Error("URL not found or unauthorized");
      }
      return { message: "URL deleted successfully" };
    } catch (error: any) {
      throw new Error(error.message || "Error deleting URL");
    }
  }

  static async updateUrl(id: string, full: string, userId: string) {
    try {
      const updated = await ShortUrl.findOneAndUpdate(
        { _id: id, userId },
        { full },
        { new: true }
      );
      if (!updated) {
        throw new Error("URL not found or unauthorized");
      }
      return updated;
    } catch (error: any) {
      throw new Error(error.message || "Error updating URL");
    }
  }

  static async getStats(userId: string) {
    try {
      const urls = await ShortUrl.find({ userId });
      const totalClicks = urls.reduce((sum, url) => sum + url.clicks, 0);
      return {
        totalUrls: urls.length,
        totalClicks,
      };
    } catch (error: any) {
      throw new Error("Failed to get statistics");
    }
  }
}
