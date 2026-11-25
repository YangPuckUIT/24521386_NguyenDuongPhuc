# Hẹn Hò Nhưng Không Yêu

A full-stack interactive dating card swipe application built with React, Express, and MongoDB.

Users can browse profiles, swipe left or right, super like profiles, undo their previous swipe, and track their game statistics.

## Features

- Swipe profiles using mouse, touch, or keyboard.
- Like, Reject, and Super Like actions.
- Undo the most recent swipe.
- Track likes, rejects, super likes, and score.
- Persist swipe history using MongoDB.
- Restore swipe history after refreshing the page.
- Reset the deck and start over.

## Tech Stack

**Frontend**

- React
- Vite
- CSS

**Backend**

- Node.js
- Express
- Mongoose 8

**Database**

- MongoDB

## Project Structure

```text
Homework 1/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── scripts/
│   │   └── server.js
│   ├── .env.example
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── hooks/
    │   ├── services/
    │   ├── utils/
    │   └── App.jsx
    ├── .env.example
    └── package.json
```

## Requirements

- Node.js
- npm
- MongoDB

## Installation

### 1. Backend

Navigate to the backend folder:

```bash
cd backend
npm install
```

Create a `.env` file based on `.env.example`.

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/hen_ho_nhung_khong_yeu
```

Start the backend:

```bash
npm run dev
```

The API server runs at:

`http://localhost:5000`

### 2. Seed Profiles

To insert sample profiles into MongoDB:

```bash
node src/scripts/seedProfiles.js
```

The seed script skips profiles that already exist.

### 3. Frontend

Open another terminal and navigate to the frontend folder:

```bash
cd frontend
npm install
```

Create a `.env` file based on `.env.example`.

```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:

```bash
npm run dev
```

Open the local URL provided by Vite.

## API Endpoints

### Profiles

| Method | Endpoint            | Description         |
| ------ | ------------------- | ------------------- |
| GET    | `/api/profiles`     | Get all profiles    |
| GET    | `/api/profiles/:id` | Get a profile by ID |
| POST   | `/api/profiles`     | Create a profile    |

### Swipes

| Method | Endpoint           | Description           |
| ------ | ------------------ | --------------------- |
| POST   | `/api/swipes`      | Create a swipe        |
| GET    | `/api/swipes`      | Get swipe history     |
| DELETE | `/api/swipes/undo` | Undo the latest swipe |
| DELETE | `/api/swipes`      | Reset swipe history   |

### Health Check

| Method | Endpoint      | Description         |
| ------ | ------------- | ------------------- |
| GET    | `/api/health` | Check server status |

## Swipe Actions

| Action      | Description          |
| ----------- | -------------------- |
| `like`      | Like a profile       |
| `reject`    | Reject a profile     |
| `superlike` | Super Like a profile |

## Keyboard Controls

| Key         | Action     |
| ----------- | ---------- |
| `←`         | Reject     |
| `→`         | Like       |
| `↑`         | Super Like |
| `Backspace` | Undo       |

## Score Calculation

- Like: +10 points
- Super Like: +20 points
- Reject: −5 points

The score is calculated from the current swipe statistics.

## Notes

- The application is designed for a single-player experience.
- Swipe history is stored in MongoDB.
- Sample profiles are provided for testing.
- Environment variables should not be committed to the repository.
