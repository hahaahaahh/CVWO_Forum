package handlers

import (
	"cvwo-forum/internal/database"
	"encoding/json"
	"net/http"
)

type AuthRequest struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

func (h *Handler) Signup(w http.ResponseWriter, r *http.Request) {
	var req AuthRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	if req.Username == "" || req.Password == "" {
		http.Error(w, "Username and password are required", http.StatusBadRequest)
		return
	}

	if err := database.CreateUser(h.db, req.Username, req.Password); err != nil {
		// In a real app we would check for specific duplicate error
		http.Error(w, "Username already exists", http.StatusConflict)
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]string{"message": "User created successfully"})
}

func (h *Handler) Login(w http.ResponseWriter, r *http.Request) {
	var req AuthRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	if database.AuthenticateUser(h.db, req.Username, req.Password) {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(map[string]string{"message": "success"})
	} else {
		http.Error(w, "Invalid credentials", http.StatusUnauthorized)
	}
}
