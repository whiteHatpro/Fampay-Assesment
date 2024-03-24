/**
 * Represents a repository for managing videos.
 */
class VideoRepo {
    constructor(model) {
        this.model = model;
    }

    /**
     * Inserts a new video into the repository.
     */
    async insert(video) {
        const videoToSave = new this.model.Video(video);
        await videoToSave.save();
        return true;
    }

    /**
     * Searches for videos in the repository based on the given query.
     */
    async search(query) {
        const videos = await this.model.Video.find({ $text: { $search: query } });
        return videos;
    }

    /**
     * Retrieves a list of videos from the repository.
     */
    async get(limit, offset) {
        const videos = await this.model.Video.find()
            .sort({ publishTime: -1 }) // Sort by publishTime in descending order
            .skip(offset) // Offset for pagination
            .limit(limit) // Number of results per page
        return videos;
    }
}

module.exports = VideoRepo;
