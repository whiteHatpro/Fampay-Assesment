const axios = require('axios');
const qs = require('qs');

/**
 * Represents a YouTube service.
 */
class YoutubeService {
    constructor(model, config, constants) {
        this.model = model;
        this.config = config;
        this.constants = constants;
    }

    /**
     * Retrieves videos from YouTube based on the provided parameters.
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
