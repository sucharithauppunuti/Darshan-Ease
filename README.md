# DarshanEase

DarshanEase is a temple darshan discovery and booking application. Visitors can browse temples, create an account, book available darshan slots, and manage their bookings. The project also includes an administration area for managing temples, darshan types, slots, bookings, and enquiries.

## Project structure

- `client/` — React 18 single-page app built with Vite.
- `server/` — Express API backed by MongoDB and Mongoose.
- `server/uploads/` — uploaded temple and other media files.

## Requirements

- Node.js and npm
- MongoDB, running locally or available through a connection URI
- Razorpay API credentials to exercise payment flows

## Local setup

Open two terminals from the project directory.

### 1. Configure and start the API

In the first terminal, run:

```powershell
cd server
Copy-Item .env.example .env
npm install
npm run dev
```

Edit `server/.env` and set at least `MONGODB_URI` and a private `JWT_SECRET`. The example uses a local MongoDB database named `darshanease`. Set `CLIENT_URL` if the client will run at a different origin.

The API listens on port `7000` by default. Check that it is responding at <http://localhost:7000/api/health>.

### 2. Configure and start the client

In the second terminal, run:

```powershell
cd client
Copy-Item .env.example .env
npm install
npm run dev
```

Open the Vite URL printed in the terminal (by default <http://localhost:5173>). The client uses `VITE_API_URL` for the API base URL; its default is `http://localhost:7000/api`.

## Environment variables

### Server (`server/.env`)

| Variable | Purpose |
| --- | --- |
| `PORT` | API port; defaults to `7000`. |
| `MONGODB_URI` | MongoDB connection URI. |
| `JWT_SECRET` | Secret used to sign authentication tokens. Use a unique, private value. |
| `JWT_EXPIRE` | Token lifetime; defaults to `7d`. |
| `RAZORPAY_KEY_ID` | Razorpay key ID used by payment flows. |
| `RAZORPAY_KEY_SECRET` | Private Razorpay key secret. |
| `CLIENT_URL` | Client origin allowed by the API; defaults to `http://localhost:5173` in the example. |
| `ADMIN_SEED_EMAIL` | Admin email used by the server seed script. |
| `ADMIN_SEED_PASSWORD` | Admin password used by the server seed script. |

### Client (`client/.env`)

| Variable | Purpose |
| --- | --- |
| `VITE_API_URL` | API base URL; defaults to `http://localhost:7000/api`. |
| `VITE_RAZORPAY_KEY_ID` | Razorpay public key ID for the client payment flow. |

Never commit real credentials or secret environment files.

## Useful commands

Run these commands from the corresponding app directory:

| Directory | Command | Purpose |
| --- | --- | --- |
| `client/` | `npm run dev` | Start the Vite development server. |
| `client/` | `npm run build` | Create a production build in `client/dist/`. |
| `client/` | `npm run lint` | Run ESLint. |
| `client/` | `npm run preview` | Preview the production build locally. |
| `server/` | `npm run dev` | Start the API with Nodemon. |
| `server/` | `npm start` | Start the API with Node.js. |

The server's `npm run seed` script drops the database configured by `MONGODB_URI` before attempting to seed it. The current script also references undefined seed data, so do not run it against data you need to keep.

## API overview

The API is mounted under `/api`. Main route groups include:

- `/auth` — registration, login, and profile
- `/temples` — temple listings and details
- `/darshan-types` and `/slots` — darshan options and availability
- `/bookings` — booking operations
- `/payment` and `/payments` — Razorpay payment operations
- `/notifications` and `/enquiries`
- `/admin` — administration endpoints

`GET /api/health` is available as a health check.
