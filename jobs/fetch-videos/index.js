const container = require('../../di/index');
const fetchVideos = container.resolve('fetchVideosController');
const jobRunIntervalMilliSec = 1 * 10 * 1000;
 
async function fetchVideosCron() {
    try {
        await fetchVideos.run();
        console.log('job ran successfully', new Date()); // helper logs can be added
    } catch (err) {
        // can log error
        console.log('error in fetch video job', err, new Date());        
    }
    setTimeout(fetchVideosCron, jobRunIntervalMilliSec);
}

fetchVideosCron();
