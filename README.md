## Overview
This repository combines a Django backend with a React and Vite frontend for a Chat App with Auto-Translation. The Django backend provides essential functionalities, including user authentication using JWT, user registration, chat room management, and real-time messaging. The React frontend, powered by Vite, seamlessly interacts with the Django backend to deliver a responsive and dynamic user interface. The Django backend also features a translation API responsible for automatically translating messages into English. Redis, managed via a Docker container, optimizes real-time updates in the chat app.

## Features
- **User Authentication:** Secure user authentication using JWT for accessing chat rooms.
- **User Registration:** Seamless user registration process to create new accounts.
- **Chat Rooms:** Users can join and participate in various chat rooms.
- **Real-time Messaging:** Instantaneous messaging within chat rooms for a seamless user experience.
- **Automatic Translation:** All messages typed by users are automatically translated to English using the DRF API.
- **Translation API:** The API handles translation requests and seamlessly integrates with the chat app.
- **Redis Integration:** Utilizes Redis for efficient real-time updates and message broadcasting.

## Usage
1. **Register:** Create a new account by clicking on the registration link.
2. **Login:** Use your registered credentials to log in and obtain a JWT token.
3. **Join a Chat Room:** Explore and join different chat rooms.
4. **Start Chatting:** Begin typing messages; they will be automatically translated to English.

## Dependencies
- Django
- Django Rest Framework
- Redis
- Docker
- React
- Vite
