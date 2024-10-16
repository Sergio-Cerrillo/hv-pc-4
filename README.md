# HV-PC-2

Composition:
FRONTEND

    client:
        There are two HTML files. index.html handles the presentation screen, and post-index.html is the chat screen.
        The project aims to maintain file independence:
        The design for both interfaces is stored in the CSS folder with their independent files. The scripts are also separate.

BACKEND

    The backend of this project is implemented in Node.js and is located in the index.ts file, which contains the main server configuration using Express. Some features of the backend include:

    Handling HTTP requests and responses.
    Connecting to SQLite databases using sqlite3.
    Implementing Socket.IO for real-time communication via WebSockets.
    Using dotenv to manage environment variables securely.
    The file is transpiled into JavaScript during the build process, and the resulting server runs from the ./dist/server/index.js file.

HOW TO INSTALL THE PROJECT:
Here are the main dependencies of the project: You will need to use "npm install" to install them:

    @libsql/client: ^0.14.0 - SQLite database client.
    dotenv: ^16.4.5 - Loads environment variables from a .env file.
    express: ^4.21.0 - Minimalist framework for creating web servers.
    morgan: 1.10.0 - HTTP request logging middleware for Express.
    socket.io: ^4.8.0 - Library for handling WebSockets.
    socket.io-client: ^4.8.0 - Socket.IO client to connect with servers.
    sqlite3: ^5.1.7 - Library for working with SQLite databases.

This project requires Node.js to run. Make sure you have an updated version installed.

HOW TO START THE PROJECT:
The project has configured shortcuts to compile the TypeScript files and run the server with a single command:

    COMMANDS:
    build: tsc (npm run build)
    start: node ./dist/server/index.js (npm run start)

    SINGLE COMMAND:
    This command ensures that both the server files and the HTML script are compiled, and once compiled, it starts the server without issues:
    build-and-start: npm run build && npm run start (npm run build-and-start)

When running the project for the first time, it will automatically generate a folder called dist, where all TypeScript files will be compiled into JavaScript for proper execution. It will also generate (if it's your first time using the project) the database (db_messages.db). Automatically the project copy HTML and CSS to the dist folder.
