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

The commands above run the app locally. Use the deployment steps below to publish it for other people.

## Deploy to Render

The included `render.yaml` deploys the frontend build, API, and Socket.IO server together as one web service in Singapore. This keeps the app on one HTTPS origin, which is needed for its login cookie and realtime connection.

1. Sign in to Render and choose **New > Blueprint**.
2. Connect the `shashank27589-blip/chatapp` GitHub repository and select the `main` branch.
3. When Render asks for `MONGODB_URI`, enter the Atlas application's connection string. Keep it private.
4. Apply the Blueprint and wait for the first deploy to finish.
5. In the new Render service, open **Connect > Outbound** and copy the outbound IP ranges for the service's region. Add those ranges to the Atlas project's **Network Access** list, then redeploy/restart the Render service if its first database connection failed.
6. Open the service's `onrender.com` URL and create accounts to use the app.

Render's Free web services sleep after 15 minutes without incoming HTTP requests or WebSocket messages and can take about a minute to wake. Choose a paid instance if you need the site to stay responsive continuously. See [Render's free service limits](https://render.com/docs/free) and [outbound IP documentation](https://render.com/docs/outbound-ip-addresses).
