const {
	createContainer,
	asValue,
	asClass,
	Lifetime,
	InjectionMode
} = require('awilix');
const config = require('../config');
const driver = require('../driver');
const model = require('../repository/data/models');
const { constants } = require('../utils');


//APIs
const GetVideosAPI = require('../api/videos/get');
const SearchVideosAPI = require('../api/videos/search');

//Logic 
const GetVideosLogic = require('../logic/videos/get-logic');
const SearchVideosLogic = require('../logic/videos/search-logic');

//Repos
const VideoRepo = require('../repository/data/repo/video-repo');
const YoutubeService = require('../repository/services/youtube-service');

//Jobs
const FetchVideosController = require('../jobs/fetch-videos/controller/fetch-videos');

const container = createContainer({ injectionMode: InjectionMode.CLASSIC });
const getScope = () => {
	return {
		lifetime: Lifetime.SINGLETON
	};
};



// Register APIs
container.register({
    getVideosAPI: asClass(GetVideosAPI, getScope()),
	searchVideosAPI: asClass(SearchVideosAPI, getScope())
});

// Register Logic
container.register({
    getVideosLogic: asClass(GetVideosLogic, getScope()),
	searchVideosLogic: asClass(SearchVideosLogic, getScope())
});

// Register Repos
container.register({
    videoRepo: asClass(VideoRepo, getScope()),
	youtubeService: asClass(YoutubeService, getScope())
});

// Register Jobs
container.register({
	fetchVideosController: asClass(FetchVideosController, getScope()),
});

// Register Configs
container.register({
    config: asValue(config),
    mongoose: asValue(driver.mongoose),
    model: asValue(model),
	constants: asValue(constants)
});

module.exports = container;
