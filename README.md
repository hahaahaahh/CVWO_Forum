# CVWO Web Forum (A Go + React Forum Application)

## 🚀 Deployment & Performance

**Live Site**: [https://cvwo-forum-assignment.netlify.app/](https://cvwo-forum-assignment.netlify.app/)

### ⚠️ Note to Graders/Users (Latency Warning)
The backend for this project is hosted on **Render's Free Tier**, which "spins down" (sleeps) after 15 minutes of inactivity.

*   **First Request Delay**: If the server is asleep, the first request (e.g., attempting to Login or Sign Up) may take **up to 60 seconds** while the backend instance wakes up.
*   **Subsequent Requests**: After the initial wake-up, all operations will be instant.

Please be patient during the first interaction!

---

A robust web forum application designed for community discussions. This project features a high-performance Go backend using PostgreSQL and a modern React frontend with TypeScript, allowing users to authenticate, discuss topics, and engage in threaded conversations.

## 💻 Tech Stack

### Backend
*   **Language**: Go (Golang)
*   **Database**: PostgreSQL (via `github.com/lib/pq`)
*   **Authentication**: `bcrypt` for secure password hashing
*   **Routing**: Standard library `net/http` with `rs/cors` for CORS handling

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

2.  Set up the Environment Variables:
    * Create a `.env` file in the root directory.
    * Add your database connection string (PostgreSQL/Supabase):
        ```env
        DATABASE_URL="postgres://postgres:[PASSWORD]@[HOST]:5432/postgres"
        ```
    * *Note: If using Supabase, use the "Session Mode" connection string (Port 5432).*

3.  Initialize and run the server:
    ```bash
    go mod tidy
    go run cmd/server/main.go
    ```
    *The server will start on port 8080.*

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

**Live Site**: [https://cvwo-forum-assignment.netlify.app/](https://cvwo-forum-assignment.netlify.app/)

### Backend (Render)
The backend is configured to respect the `PORT` environment variable used by cloud platforms.
*   **Build Command**: `go build -o server cmd/server/main.go`
*   **Start Command**: `./server`

### Frontend (Netlify)
The frontend is configured for SPA routing (using `_redirects` or Vercel config).
*   **Build Command**: `npm run build`
*   **Output Directory**: `dist`
*   **Configuration**: Set `VITE_API_URL` environment variable to your production backend URL.

## AI Usage Documentation

This project leveraged AI tools, including GitHub Copilot and Gemini, to assist with the following aspects of development:

**Technical Implementation & Libraries:**
* **Backend:** Consulted AI for best practices on integrating the `rs/cors` middleware to securely handle cross-origin requests.
* **Frontend:** Referenced examples for structuring modular HTTP requests using `axios` to communicate with the Go backend.

**User Interface & Experience:**
* **Routing:** Generated configuration strategies for React Router to ensure seamless navigation in a Single Page Application (SPA) environment.
* **Feedback Mechanisms:** Refined the logic for displaying loading states and error messages, ensuring a better user experience during server initialization.

**Infrastructure & Deployment:**
* **Hosting Configuration:** Assisted in setting up the decoupled architecture, specifically linking the Netlify frontend with the Render backend.
* **Database Connectivity:** Clarified the necessary connection string adjustments (switching from "Direct" to "Pooler" mode) to prevent timeout issues between the Go driver and Supabase.

**Troubleshooting & Optimization:**
* **Error Resolution:** Diagnosed and resolved specific deployment errors, including IPv6 network unreachable errors and CORS policy blocks.
* **Platform Specifics:** Provided solutions for platform-specific quirks, such as creating the `_redirects` file for Netlify and handling "Cold Start" delays on Render.

**Documentation:**
* **Content Drafting:** Aided in structuring and refining this README to provide clear setup instructions and performance notes for graders.

*All code snippets and suggestions provided by AI tools were manually reviewed, tested, and adapted by the developer, and no AI-generated code is used without human oversight.*

## 👤 Author

**Hong Yueqian**
* National University of Singapore
* CVWO Assignment AY2025/26