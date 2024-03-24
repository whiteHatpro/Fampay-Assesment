/**
 * Represents the logic for searching videos.
 */
class SearchVideosLogic {
    /**
     * Creates an instance of SearchVideosLogic.
     * @param {VideoRepository} videoRepo - The video repository.
     */
    constructor(videoRepo) {
        this.videoRepo = videoRepo;
    }

    /**
     * Searches videos based on the provided query.
     */
    async searchVideos({ q }) {
        const videos = await this.videoRepo.search(q);
        console.log('videos search logic', videos) // info logs can be added
        return videos;
    }
}

module.exports = SearchVideosLogic
