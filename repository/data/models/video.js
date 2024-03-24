const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
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

// indexes
videoSchema.index({ publishTime: -1 }); // sort by publishTime descending

const Video = mongoose.model('Video', videoSchema);

module.exports = Video;
