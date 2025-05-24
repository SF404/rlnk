import mongoose from 'mongoose'

const shortUrlSchema = new mongoose.Schema({
    full: {type: String, required: true},
    short: {type: String, required: true},
    userId: {type: mongoose.Schema.ObjectId, required: true},
    clicks: {type: Number, default: 0}
});

export const ShortUrl = mongoose.model('ShortUrl', shortUrlSchema);