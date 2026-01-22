package main

import (
	"cvwo-forum/internal/database"
	"fmt"
	"log"
	"net/http"
)

func main() {
	// Initialize Database
	db, err := database.InitDB("forum.db")
	if err != nil {
		log.Fatalf("Failed to initialize database: %v", err)
	}
	defer db.Close()
	fmt.Println("Database connected and schema loaded successfully")

	// Basic route
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "CVWO Forum Backend is Running!")
	})

	// Start server
	fmt.Println("Server starting on :8080")
	if err := http.ListenAndServe(":8080", nil); err != nil {
		log.Fatal(err)
	}
}
