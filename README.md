# ChatApp

A real-time one-to-one chat application built with React, Express, MongoDB, and Socket.IO.

## Features

- Sign up and log in with an email and password
- Find registered users and start a conversation
- Send and receive messages in real time
- See whether users are online
- Store users and conversations in MongoDB

## Tech stack

- Frontend: React, Vite, Tailwind CSS, DaisyUI
- Backend: Node.js, Express, Mongoose, Socket.IO
- Database: MongoDB Atlas (or a local MongoDB instance)

## Requirements

- Node.js and npm
- A MongoDB database

## Configure the backend

Create `Backend/.env` (this file is ignored by Git) with:

```env
PORT=5000
MONGODB_URI=<your MongoDB connection string>
MONGODB_DB=chatapp
JWT_TOKEN=<a long random secret>
```

Get `MONGODB_URI` from **Atlas > Clusters > Connect > Drivers**. Use a MongoDB database user in the connection string; this is separate from the email and password used to sign in to ChatApp. URL-encode special characters in the database user's password. In Atlas **Network Access**, allow the public IP address of the machine running the backend.

Do not commit `.env` files or share their values.

## Install dependencies

From the repository root, install dependencies for each app:

```sh
cd Backend
npm install
cd ../Frontend
npm install
```

## Run locally

Open two terminals from the repository root.

In Windows PowerShell, use `npm.cmd` if the execution policy blocks `npm` (for example, `npm.cmd start`). On macOS/Linux or Windows Command Prompt, use `npm`.

Terminal 1, start the backend:

```sh
cd Backend
npm start
```

The backend listens on `http://localhost:5000` and connects to MongoDB. The frontend's Vite proxy sends `/api` requests to this port.

Terminal 2, start the frontend:

```sh
cd Frontend
npm run dev
```

Open [http://localhost:3001](http://localhost:3001).

## Use the app

1. Create an account with your name, email, and password.
2. Create a second account in another browser or browser profile.
3. Search for the other account by name and select it to open a chat.
4. Send messages; online status appears when the other account is connected.

The app is configured for local development. To let people connect from other devices or networks, deploy the frontend and backend and configure the public frontend URL, Socket.IO endpoint, and Atlas network access for the deployed backend.
