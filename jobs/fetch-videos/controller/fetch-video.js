/**
 * VideoController handles video fetching operations.
 */
class VideoController {
    constructor(service, repository, configuration, constants) {
      this.service = service;
      this.repository = repository;
      this.configuration = configuration;
      this.constants = constants;
    }
  
    /**
     * Initiates the process of fetching videos.
     */
    async fetchVideos() {
      const publishedAfter = this.calculatePublishedAfter();
      const predefinedText = this.constants.fetchVideosJobConfig.predefinedText;
      const maxVideos = this.constants.fetchVideosJobConfig.maxVideosToFetch;
      const videos = await this.service.getVideos(predefinedText, maxVideos, publishedAfter, this.configuration.service.youtube.apiKey);
        console.log('Fetched videos:', videos); // Optional info logging
      if (!videos || !videos.items || !videos.items.length) {
        return;
      }
      for (const video of videos.items) {
        if (!video.snippet) {
          continue;
        }
        console.log('Inserted video data:', video.snippet); // Optional info logging
        await this.repository.insert(video.snippet);
      }
    }
  
    /**
     * Calculates the date to filter videos published after.
     */
    calculatePublishedAfter() {
      const currentDate = new Date();
      currentDate.setSeconds(currentDate.getSeconds() - this.constants.fetchVideosJobConfig.fetchVideoThreshold);
      console.log('Published after:', currentDate.toISOString()); // Optional info logging
      return currentDate.toISOString();
    }
  }
  
  module.exports = VideoController;
  