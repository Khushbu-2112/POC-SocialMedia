#### Instagram Posting and Feed Management
This project is a proof of concept (POC) for an Instagram-like application built using Node.js, Express.js, and MongoDB. The application allows users to post content, manage feeds, and interact with posts through likes and comments.

Features
- User Authentication
- Create, Read, Update, and Delete (CRUD) operations for posts
- Feed generation and management
- Like and comment functionality
- Scheduled task to compute post scores

Technologies Used
- Node.js
- Express.js
- MongoDB
- Mongoose
- Node-cron

Prerequisites
Before you begin, ensure you have the following installed:

- Node.js (v14.x or higher)
- MongoDB (v4.x or higher)

#### Getting Started
Clone the Repository
```
git clone https://github.com/Khushbu-2112/POC-SocialMedia.git
cd POC-SocialMedia
```

Install Dependencies
```
npm install
```

MONGODB_URI=mongodb://localhost:27018/instagram-poc
PORT=3000

Run MongoDB
Ensure MongoDB is running. You can start it using: mongod --dbpath=/path/to/your/db
```
mongod --dbpath ~/mongo-data --port 27018
```

Run the Application
```
npm start
```

The server will start on http://localhost:3000.

#### API Endpoints

create user
```
curl --request POST \
  --url http://localhost:3000/api/users \
  --header 'Content-Type: application/json' \
  --data '{"username": "khushi_r"}'
```

get users
```
curl --request GET \
  --url http://localhost:3000/api/users
```

follow user
```
curl -X POST http://localhost:3000/api/users/<userId>/follow -H "Content-Type: application/json" -d '{"userId": "<followUserId>"}'
```

create post
```
curl --request POST \
  --url http://localhost:3000/api/posts \
  --header 'Content-Type: application/json' \
  --data '{"content": "Hello from khushbu", "authorId": "<userId>"}'
```

post with file (create uploads folder in root to save file)
```
curl --request POST \
  --url http://localhost:3000/api/posts \
  --header 'Content-Type: multipart/form-data' \
  --form 'content=jay post' \
  --form authorId=<userId> \
  --form file=<file>
```

like post
```
curl --request POST \
  --url http://localhost:3000/api/posts/<postId>/like \
  --header 'Content-Type: application/json' \
  --data '{"userId": "<userId>"}'
```

add comment
```
curl --request POST \
  --url http://localhost:3000/api/posts/<postId>/comment \
  --header 'Content-Type: application/json' \
  --data '{"text": "Nice post!", "userId": "<userId>"}'
```

get user feed
```
curl --request GET \
  --url http://localhost:3000/api/users/<userId>/feed
```