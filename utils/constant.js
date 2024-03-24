module.exports = {
    getVideosAPIConfig: {
        maxLimit: 10,
    },
    fetchVideosJobConfig: {
        maxVideosToFetch: 5,
        fetchVideoThreshold: 30, // 30 seconds
        predefinedText: "tech"
    },
    youtubeServiceConfig: {
        searchAPI: {
            part: 'snippet',
            type: 'video',
        }
    }
}
