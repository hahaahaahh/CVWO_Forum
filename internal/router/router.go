package router

import (
	"cvwo-forum/internal/handlers"
	"database/sql"
	"net/http"
)

func SetupRouter(db *sql.DB) http.Handler {
	mux := http.NewServeMux()

	h := handlers.NewHandler(db)

	mux.HandleFunc("GET /topics", h.ListTopics)
	mux.HandleFunc("GET /topics/{id}/posts", h.ListPosts)
	mux.HandleFunc("POST /topics/{id}/posts", h.CreatePost)
	mux.HandleFunc("DELETE /posts/{id}", h.DeletePost)
	mux.HandleFunc("PUT /posts/{id}", h.UpdatePost)
	mux.HandleFunc("GET /posts/{id}/comments", h.ListComments)
	mux.HandleFunc("POST /posts/{id}/comments", h.CreateComment)
	mux.HandleFunc("DELETE /comments/{id}", h.DeleteComment)

	return enableCORS(mux)
}

func enableCORS(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}

		next.ServeHTTP(w, r)
	})
}
