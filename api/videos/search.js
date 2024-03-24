/**
 * Represents a class for searching videos.
 */
class SearchVideos {
    constructor(searchVideosLogic) {
        this.searchVideosLogic = searchVideosLogic;
    }

    /**
     * Handles the request for searching videos.
     */
    async handleRequest(req, res) {
        try {
            const validInput = this.validateRequest(req);
            if (!validInput) {
                // can log message
                return res.status(400).send({
                    message: 'Invalid request'
                });
            }
            const videos = await this.searchVideosLogic.searchVideos(validInput);
            return res.status(200).send({
                videos
            });
        } catch (error) {
            console.log(error);
            return res.status(500).send({
                message: 'Internal server error'
            });
        }
    }

        /**
         * Validates the request for searching videos.
         */
        validateRequest(req) {
            const query = req.query;
            const { q } = query;
            if (!q) {
                return false;
            }
            return {
                q
            };
        }
    }

module.exports = SearchVideos
