package main

import (
	"cvwo-forum/internal/database"
	"fmt"
	"log"
	"net/http"
)

func main() {
	fmt.Println("CVWO Backend Running")

	// Initialize Database
	db, err := database.InitDB("forum.db")
	if err != nil {
		log.Fatalf("Failed to initialize database: %v", err)
	}
	defer db.Close()

	// Basic server setup (placeholder for future logic)
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "Welcome to Gossip with Go!")
	})

	// Use a common port
	// http.ListenAndServe(":8080", nil)
}
