const configuration = {
  "app": {
      "port": 3000
  },
  "db": {
      "mongoDB": {
          "url": "mongodb+srv://mohakSrivas:Varsha1970@cluster0.pmkfwop.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
      }
  },
  "service": {
      "youtube": {
          "url": "https://youtube.googleapis.com/youtube/v3",
          "apiKey": "AIzaSyCTU1vwryEoHuMde3mWvtvN7WWMT48HuYM",
          "fallBackApiKey": "AIzaSyCTU1vwryEoHuMde3mWvtvN7WWMT48HuYM"
      }
  }
};

module.exports = configuration;
