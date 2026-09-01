Music App

A music streaming and management application built with Node.js and Express. This application allows users to search for music on YouTube, download audio tracks, and manage their personal music library with authentication.

Features

- User authentication and authorization with JWT tokens
- Search YouTube for music videos
- Download and stream audio from YouTube videos
- Secure password management with bcryptjs encryption
- User music library management
- RESTful API architecture
- CORS enabled for cross-origin requests
- MongoDB database for persistent storage

Technology Stack

Backend
- Node.js runtime environment
- Express.js web framework
- MongoDB with Mongoose ODM for database management
- JWT (jsonwebtoken) for authentication
- bcryptjs for password hashing and security
- youtube-dl-exec for YouTube audio extraction
- CORS middleware for cross-origin requests
- dotenv for environment configuration

Getting Started

Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)
- MongoDB instance running locally or in the cloud
- YouTube video URLs or search queries for music

Installation

1. Clone the repository to your local machine

2. Navigate to the project directory

3. Install all dependencies:
   npm install

4. Create a .env file in the root directory with the following variables:
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key

5. Start the server:
   npm start

API Endpoints

Authentication Routes (/api/auth)
- POST /api/auth/register - Create a new user account
- POST /api/auth/login - Log in with existing credentials
- POST /api/auth/logout - Log out and invalidate session

Music Management Routes (/api/songs)
- GET /api/songs - Retrieve user's music library
- POST /api/songs - Add a new song to library
- DELETE /api/songs/:id - Remove a song from library

YouTube Routes (/api)
- GET /api/search - Search for music on YouTube
- POST /api/download - Download audio from YouTube video

Health Check
- GET /api/health - Check if the backend server is running

Project Structure

backend/
  config/
    - Database connection configuration
  models/
    - MongoDB schema definitions for User and Song data
  routes/
    - auth.js: Authentication endpoints
    - songs.js: Music library management endpoints
    - youtube.js: YouTube search and download endpoints
  middleware/
    - Authentication middleware and error handling
  utils/
    - Helper functions and utilities
  ytdlp.js
    - YouTube audio extraction utilities using youtube-dl-exec
  server.js
    - Main Express server configuration

Core Functionality

YouTube Audio Extraction
The app uses youtube-dl-exec to:
- Extract the best available audio format (m4a preference) from YouTube videos
- Search YouTube for up to 15 music results
- Retrieve metadata including title, duration, uploader, and thumbnail

Authentication
User credentials are secured with:
- bcryptjs password hashing during registration
- JWT token generation for session management
- Middleware protection on authenticated routes

Database Integration
MongoDB stores:
- User profiles and encrypted passwords
- User's music library and saved tracks
- User preferences and metadata

Environment Configuration

The application uses environment variables for configuration. Create a .env file with:
- PORT: Server port (default: 5000)
- MONGODB_URI: MongoDB connection string
- JWT_SECRET: Secret key for JWT token generation

Usage Example

1. Register a new account via the auth endpoint
2. Log in to receive a JWT token
3. Use the token to authenticate subsequent requests
4. Search for music using YouTube search functionality
5. Add songs to your library
6. Manage and organize your music collection

Development Notes

- Ensure MongoDB is running before starting the server
- Use valid MongoDB connection string in environment variables
- The server provides a health check endpoint for monitoring
- All API responses follow RESTful conventions
- Error handling is implemented at middleware level

Future Enhancements

- User profile customization
- Playlist creation and management
- Music recommendations based on listening history
- Offline music download capability
- Social features for sharing playlists
- Advanced search filters

License

ISC

Contributing

For contributions, please fork the repository and submit a pull request with your changes.

Support

For issues or questions, please create an issue in the repository.
