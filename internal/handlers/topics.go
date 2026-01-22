package handlers

import (
	"cvwo-forum/internal/database"
	"database/sql"
	"encoding/json"
	"net/http"
)

type Handler struct {
	db *sql.DB
}

func NewHandler(db *sql.DB) *Handler {
	return &Handler{db: db}
}

func (h *Handler) ListTopics(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	topics, err := database.GetTopics(h.db)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	if err := json.NewEncoder(w).Encode(topics); err != nil {
		http.Error(w, "Failed to encode response", http.StatusInternalServerError)
	}
}
