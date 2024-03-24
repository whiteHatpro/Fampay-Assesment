const axios = require('axios');
const qs = require('qs');

/**
 * Represents a YouTube service.
 */
class YouTubeService {
    constructor(database, settings, environment) {
        this.database = database;
        this.settings = settings;
        this.environment = environment;
    }

   /** 
    * Retrieves videos from YouTube based on the provided parameters.
    */
    async fetch_Videos(query, limit, publishedAfter, apiKey, isFallback) {
        try {
            const query_Str = qs.stringify({
                part: this.settings.youtube.part,
                q: query,
                key: apiKey,
                type: this.settings.youtube.type,
                maxResults: limit,
                publishedAfter
            });
            const url = this.environment.youtube.url + '/search?' + query_Str;
            const options = {
                method: 'GET',
                headers: { 'content-type': 'application/json' },
                url,
            };
            const response = await axios(options);
            return response.data;
        } catch (error) {
            if (isFallback) {
                throw error;
            }
            
            // Retry with fallback API key (BONUS STEP)
            return this.fetch_Videos(query, limit, publishedAfter, this.environment.youtube.fallbackApiKey, true);
        }
    }
}

module.exports = YouTubeService;
