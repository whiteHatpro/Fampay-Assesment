# Project Design Overview

## Architecture Layers

- **Layer 1: API layer**
- **Layer 2: Logic Layer**
- **Layer 3: Repository Layer**

**Flow:**
- API Layer validates requests and calls Logic Layer.
- Logic Layer calls Repository Layer, filtering responses.
- Repository Layer communicates with external services/databases.

i.e., API Layer -> Logic Layer -> Repository Layer

**Dependency Injection:**
- Dependencies managed in "dependency-injection/index.js".

## Cron Job

- Fetches videos every 10 seconds for the predefined text "tech".

## Reasons to Choose MongoDB

- Lower consistency (Eventual Consistency) is acceptable for slight delays in showing the latest videos.
- Easily scalable using sharding compared to SQL.

## MongoDB Indexing

- `title_text_description_text`: Index on title and description for text searching.
- `publishTime_-1`: Descending index on publishedTime for efficient retrieval.

## API Fallback Key (Bonus Included)

- Retries with a new API key if quota is exceeded.
- Implemented in "repository/services/youtube-service.js" with console.log helpers.

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
curl --location 'localhost:3000/video-service/videos?limit=15&offset=0'
```


