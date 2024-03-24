/**
 * Manages video data in the repository.
 */
class VideoRepository {
    constructor(dataModel) {
        this.dataModel = dataModel;
    }

    /**
     * Inserts a new video into the repository.
     */
    async insert(videoData) {
        const video = new this.dataModel.Video(videoData);
        await video.save();
        return true;
    }

    /**
     * Retrieves a list of videos from the repository.
     */
    async getVideos(limit, offset) {
        const videos = await this.dataModel.Video.find()
            .sort({ publishTime: -1 }) // Sort by publishTime in descending order
            .skip(offset) // Offset for pagination
            .limit(limit); // Number of results per page
        return videos;
    }
}

module.exports = VideoRepository;
