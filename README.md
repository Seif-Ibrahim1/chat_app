# Django Chat App with Auto-Translation

## Overview

This repository consists of two interconnected apps: a chat app and a translation API. The chat app provides user authentication, user registration, chat room functionality, and real-time messaging. The second app is an API responsible for translating messages into English using an automatic translation service. Additionally, the project utilizes Redis, managed via a Docker container, for efficient handling of real-time updates in the chat app.

## Features

- **User Authentication**: Secure user authentication for accessing chat rooms.
- **User Registration**: Seamless user registration process to create new accounts.
- **Chat Rooms**: Users can join and participate in various chat rooms.
- **Real-time Messaging**: Instantaneous messaging within chat rooms for a seamless user experience.
- **Automatic Translation**: All messages typed by users are automatically translated to English using the DRF API.
- **Trnslation API**: The API handles translation requests and integrates with the chat app.
- **Redis Integration**: Utilizes Redis for efficient real-time updates and message broadcasting.


## Usage

1. **Register**: Create a new account by clicking on the registration link.
2. **Login**: Use your registered credentials to log in.
3. **Join a Chat Room**: Explore and join different chat rooms.
4. **Start Chatting**: Begin typing messages; they will be automatically translated to English.

## Dependencies

- Django
- Django Rest Framework
- Redis
- Docker
