package handlers

import (
	"cvwo-forum/internal/database"
	"cvwo-forum/internal/models"
	"encoding/json"
	"net/http"
	"strconv"
)

func (h *Handler) ListPosts(w http.ResponseWriter, r *http.Request) {
	topicIDStr := r.PathValue("id")
	topicID, err := strconv.Atoi(topicIDStr)
	if err != nil {
		http.Error(w, "Invalid topic ID", http.StatusBadRequest)
		return
	}

	posts, err := database.GetPostsByTopic(h.db, topicID)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(posts); err != nil {
		http.Error(w, "Failed to encode response", http.StatusInternalServerError)
	}
}

func (h *Handler) CreatePost(w http.ResponseWriter, r *http.Request) {
	topicIDStr := r.PathValue("id")
	topicID, err := strconv.Atoi(topicIDStr)
	if err != nil {
		http.Error(w, "Invalid topic ID", http.StatusBadRequest)
		return
	}

	var post models.Post
	if err := json.NewDecoder(r.Body).Decode(&post); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	post.TopicID = topicID

	id, err := database.CreatePost(h.db, post)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]int64{"id": id})
}
