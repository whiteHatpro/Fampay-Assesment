const { createContainer, asValue, asClass, Lifetime, InjectionMode } = require('awilix');
const configData = require('../config');
const dbDriver = require('../driver');
const dataModels = require('../repository/data/models');
const { appConstants } = require('../utils');

// APIs
const VideoRetrievalAPI = require('../api/videos/get');

// Logic
const VideoRetrievalLogic = require('../logic/videos/get-logic');

// Repositories
const VideoDataRepository = require('../repository/data/repo/video-repo');
const YouTubeDataService = require('../repository/services/youtube-service');

// Jobs
const VideoFetchController = require('../jobs/fetch-videos/controller/fetch-videos');

const container = createContainer({ injectionMode: InjectionMode.CLASSIC });
const getScope = () => ({
    lifetime: Lifetime.SINGLETON
});

// Register APIs
container.register({
    videoRetrievalAPI: asClass(VideoRetrievalAPI, getScope()),
});

// Register Logic
container.register({
    videoRetrievalLogic: asClass(VideoRetrievalLogic, getScope()),
});

// Register Repositories
container.register({
    videoDataRepository: asClass(VideoDataRepository, getScope()),
    youTubeDataService: asClass(YouTubeDataService, getScope())
});

// Register Jobs
container.register({
    videoFetchController: asClass(VideoFetchController, getScope())
});

// Register Configurations
container.register({
    configData: asValue(configData),
    mongoose: asValue(dbDriver.mongoose),
    modelsData: asValue(dataModels),
    appConstants: asValue(appConstants)
});

module.exports = container;
