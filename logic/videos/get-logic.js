/**
 * Represents the logic for retrieving videos.
 */
class GetVideosLogic {

    constructor(videoRepo) {
        this.videoRepo = videoRepo;
    }

    /**
     * Retrieves videos based on the specified limit and offset.
     */
    async getVideos({ limit, offset }) {
        const videos = await this.videoRepo.get(limit, offset);
        console.log('videos get logic', videos) // info logs can be added
        return videos;
    }
}

module.exports = GetVideosLogic
