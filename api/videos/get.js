/**
 * Represents a class for handling video requests.
 */
class GetVideos {
    constructor(getVideosLogic, constants) {
        this.getVideosLogic = getVideosLogic;
        this.constants = constants;
    }

    /**
     * Handles the incoming video request.
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

            const videos = await this.getVideosLogic.getVideos(validInput);
            return res.status(200).send({
                videos
            });
        } catch (error) {
            console.log(error); // can log message
            return res.status(500).send({
                message: 'Internal server error'
            });
        }
    }

    /**
     * Validates the request parameters.
     * @param {Object} req - The request object.
     * @returns {Object|boolean} - The valid request parameters or false if invalid.
     */
    validateRequest(req) {
        const query = req.query;
        const { limit, offset } = query;
        if (!limit || !offset) {
            return false;
        }
        if (limit > this.constants.getVideosAPIConfig.maxLimit) {
            return false;
        }
        return {
            limit,
            offset
        };
    }
}

module.exports = GetVideos
