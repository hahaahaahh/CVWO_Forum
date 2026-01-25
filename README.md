# CVWO Web Forum (A Go + React Forum Application)

A robust web forum application designed for community discussions. This project features a high-performance Go backend using SQLite and a modern React frontend with TypeScript, allowing users to authenticate, discuss topics, and engage in threaded conversations.

## 🚀 Tech Stack

### Backend
*   **Language**: Go (Golang)
*   **Database**: SQLite (via `modernc.org/sqlite`)
*   **Authentication**: `bcrypt` for secure password hashing
*   **Routing**: Standard library `net/http` with custom middleware

### Frontend
*   **Framework**: React
*   **Language**: TypeScript
*   **Build Tool**: Vite
*   **UI Library**: Material UI (MUI)
*   **HTTP Client**: Axios

## ✨ Features

*   **User Authentication**: Secure Sign Up and Login functionality with password hashing.
*   **Content Management**: Create, Read, and Delete functionality for Posts and Comments.
*   **Ownership Enforcement**: Only authors can delete their own content.
*   **Topic Management**: Organized discussions grouped by user-created topics.
*   **Search Functionality**: Real-time filtering for finding specific Topics and Posts.
*   **Navigation**: Intuitive Breadcrumb navigation for easy traversal.
*   **Persistent Login**: User sessions maintained via LocalStorage.

## 🛠️ Getting Started

### Prerequisites
*   [Go](https://go.dev/dl/) (version 1.22 or higher)
*   [Node.js](https://nodejs.org/) (version 18 or higher)

### Backend Setup

1.  Navigate to the project root:
    ```bash
    cd CVWO_Forum
    ```
2.  Initialize and run the server:
    ```bash
    go mod tidy
    go run cmd/server/main.go
    ```
    *The server will start on port 8080. The `forum.db` SQLite database will be automatically created and seeded on the first run.*

### Frontend Setup

1.  Open a new terminal and navigate to the frontend directory:
    ```bash
    cd FrontEnd
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```
    *The application will operate at `http://localhost:5173`.*

## ☁️ Deployment

### Backend (Render/Railway)
The backend is configured to respect the `PORT` environment variable used by cloud platforms.
*   **Build Command**: `go build -o server cmd/server/main.go`
*   **Start Command**: `./server`

### Frontend (Netlify/Vercel)
The frontend is configured for SPA routing (using `_redirects` or Vercel config).
*   **Build Command**: `npm run build`
*   **Output Directory**: `dist`
*   **Configuration**: Set `VITE_API_URL` environment variable to your production backend URL.