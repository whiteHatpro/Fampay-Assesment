const axios = require('axios');
const qs = require('qs');

/**
 * Represents a YouTube service.
 * @class
 */
class YoutubeService {
    constructor(model, config, constants) {
        this.model = model;
        this.config = config;
        this.constants = constants;
    }

    /**
     * Retrieves videos from YouTube based on the provided parameters.
     * @param {string} q - The search query.
     * @param {number} limit - The maximum number of videos to retrieve.
     * @param {string} publishedAfter - The date and time (in ISO 8601 format) after which the videos were published.
     * @param {string} apiKey - The API key to access the YouTube API.
     * @param {boolean} isFallBackAPIKey - Indicates whether the fallback API key is being used.
     * @returns {Promise<object>} - A promise that resolves to the retrieved videos.
     * @throws {Error} - If an error occurs while retrieving the videos.
     */
    async getVideos(q, limit, publishedAfter, apiKey, isFallBackAPIKey) {
        try {
            const queryStr = qs.stringify({
                part: this.constants.youtubeServiceConfig.searchAPI.part,
                q,
                key: apiKey,
                type: this.constants.youtubeServiceConfig.searchAPI.type,
                maxResults: limit,
                publishedAfter
            });
            const url = this.config.service.youtube.url + '/search?' + queryStr;
            const options = {
                method: 'GET',
                headers: { 'content-type': 'application/json' },
                url,
            };
            const res = await axios(options);
            return res.data;
        } catch (err) {
            if (isFallBackAPIKey) {
                throw err;
            }
            // retry with fallback API key
            return this.getVideos(q, limit, publishedAfter, this.config.service.youtube.fallBackApiKey, true);
        }
    }
}

module.exports = YoutubeService;
