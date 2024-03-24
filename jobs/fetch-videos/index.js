const container = require('../../dependency-injection/index');
const fetchVideos = container.resolve('VideoController');
const jobRunIntervalMilliSec = 1 * 10 * 1000;
 
async function fetchVideosCron() {
    try {
        await fetchVideos.run();
        console.log('job ran successfully', new Date());
    } catch (err) {
        // can log error
        console.log('error in fetch video job', err, new Date());        
    }
    setTimeout(fetchVideosCron, jobRunIntervalMilliSec);
}

fetchVideosCron();