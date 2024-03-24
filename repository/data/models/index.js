const mongoose = require('mongoose');

/**
 * Represents a video schema.
 */
const video_Schema = new mongoose.Schema({
    publishedAt: { type: Date, required: true },
    channelId: { type: String, required: false },
    title: { type: String, required: true },
    description: { type: String, required: false },
    thumbnails: {
        default: {
            url: { type: String, required: true },
            width: { type: Number, required: true },
            height: { type: Number, required: true },
        },
        medium: {
            url: { type: String, required: true },
            width: { type: Number, required: true },
            height: { type: Number, required: true },
        },
        high: {
            url: { type: String, required: true },
            width: { type: Number, required: true },
            height: { type: Number, required: true },
        },
    },
    channelTitle: { type: String, required: false },
    publishTime: { type: Date, required: true },
});

// Indexes
video_Schema.index({ publishTime: -1 });

// Create Videos model
const Videos = mongoose.model('Video', video_Schema);

module.exports = Videos;
