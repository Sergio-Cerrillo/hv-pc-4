# HV-PC-4

Implement Next.js

## Description

-My Chat Application is a real-time chat app built with React, Next.js, Socket.io, and Express. It allows users to send and receive messages in real time, featuring a simple interface and a backend that uses SQLite for message storage.

## Features

-Real-time message sending and receiving.
-Simple and responsive user interface.
-Message storage in an SQLite database.
-CORS support to facilitate communication between the client and server.

## Technologies Used

-Frontend: React, Next
-Backend: Express, Socket.io, SQLite
-Development Tools: TypeScript, Nodemon, Concurrently

## Dependencies

-Express: To create the backend server.
-Socket.io: For real-time communication.
-React: To build the user interface.
-SQLite3: For the database.
-CORS: To allow requests between different origins.
-dotenv: To manage environment variables.
-Morgan: To log HTTP requests.

## Need to install

    - npm install express socket.io
    - npm install --save-dev @types/express @types/socket.io
    - npm install --save-dev typescript ts-node @types/node
    - npm install --save-dev @types/react @types/react-dom
    - npm install react react-dom
    - npm install socket.io-client

## Starting the Project

-Scripts have been created to easily start the application. You only need one command to launch it (using Concurrently):
1- "npm run start-server"
2- Wait to see "Usuario conectado"
3- Enjoy!
