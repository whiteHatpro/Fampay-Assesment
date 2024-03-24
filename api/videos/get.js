/**
 * VideoHandler: Responsible for managing video requests.
 */
class VideoHandler {
    constructor(logic, settings) {
        this.logic = logic;
        this.settings = settings;
    }

    /**
     * Handles incoming video requests.
     */
    async handle(req, res) {
        try {
            const data = this.validate(req);
            if (!data) {
                // Log invalid request
                return res.status(400).send({
                    message: 'Invalid request'
                });
            }

            const videos = await this.logic.fetch(data);
            return res.status(200).send({
                videos
            });
        } catch (error) {
            console.error('Error:', error); // Log internal server error
            return res.status(500).send({
                message: 'Internal server error'
            });
        }
    }

    /**
     * Validates request parameters.
     */
    validate(req) {
        const query = req.query;
        const { limit, offset } = query;
        if (!limit || !offset) {
            return false;
        }
        if (limit > this.settings.maxVideos) {
            return false;
        }
        return {
            limit,
            offset
        };
    }
}

module.exports = VideoHandler;
