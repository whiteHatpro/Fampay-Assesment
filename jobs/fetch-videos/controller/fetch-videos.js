/**
 * Controller class for fetching videos.
 */
class FetchVideosController {
  constructor(youtubeService, videoRepo, config, constants) {
    this.youtubeService = youtubeService;
    this.videoRepo = videoRepo;
    this.config = config;
    this.constants = constants;
  }

  /**
   * Runs the video fetching process.
   */
  async run() {

    const publishedAfter = this.getPublishAfterDate();
    const limit = this.constants.fetchVideosJobConfig.maxVideosToFetch;
    const predefinedText = this.constants.fetchVideosJobConfig.predefinedText;
    const videos = await this.youtubeService.getVideos(predefinedText, limit, publishedAfter, this.config.service.youtube.apiKey);
    if (!videos || !videos.items || !videos.items.length) {
      return;
    }
    for (const videoData of videos.items) {
      if (!videoData.snippet) {
        continue;
      }
      console.log('videoData inserted', videoData.snippet) // info logs can be added
      await this.videoRepo.insert(videoData.snippet);
    }
  }

  getPublishAfterDate() {
    let currentDate = new Date();
    currentDate.setSeconds(currentDate.getSeconds() - this.constants.fetchVideosJobConfig.fetchVideoThreshold);// Subtract 30 seconds
    let publishedAfter = currentDate.toISOString();    // Format the date as RFC 3339
    return publishedAfter;
  }
}

module.exports = FetchVideosController;
