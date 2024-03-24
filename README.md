# Project Design Overview


##Flow
- API Layer -> Logic Layer -> Repository Layer
- Dependencies managed in "di/index.js".

## Cron Job

- Fetches videos every 10 seconds for the predefined text "tech".

## Reasons to Choose MongoDB

- Lower consistency (Eventual Consistency) is acceptable for slight delays in showing the latest videos.
- Easily scalable using sharding compared to SQL.

## Text Searching (Bonus Included)

- Returns videos if title or description is matched using MongoDB text search operator.
- Bonus: Partial matches returned by checking if individual words are present in the title/description as substrings.
- Elastic search can be used to make the searching better in large scale projects

## API Fallback Key (Bonus Included)

- Retries with a new API key if quota is exceeded.
- Implemented in "repository/YouTubeServices/youtube-YouTubeService.js" with console.log helpers.

**Steps to Run Without Docker**

1. Install Node 16.
2. Run `npm i`.
3. Run `node index.js` (API server on port 3000).
4. Run `node jobs/fetch-videos/index.js` (Cron job for YouTube videos).
5. Use provided CURL commands.

# CURL

## API: GET /
*Description*: Get all videos in descending order of publised time having query as `limit` and `offset`. `limit` can take `15` as the max limit

```
curl --location 'localhost:3000/video-YouTubeService/videos?limit=15&offset=0'
```

## API: GET /search (Bonus Included)

*Description:* Search using query `q`

```
curl --location 'localhost:3000/video-service/videos/search?q=tech'


