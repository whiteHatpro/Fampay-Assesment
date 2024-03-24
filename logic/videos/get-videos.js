/**
 * The logic for retrieving videos.
 */
class VideoRetrievalLogic {

    constructor(videoRepository) {
        this.videoRepository = videoRepository;
    }

    /**
     * Retrieves videos based on the specified limit and offset.
     */
    async getVideos({ maximumLimit, offsetValue }) {
        const videos = await this.videoRepository.get(maximumLimit, offsetValue);
        console.log('videos retrieval logic', videos) // info logs can be added
        return videos;
    }
}

module.exports = VideoRetrievalLogic;
