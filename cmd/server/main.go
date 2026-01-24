package main

import (
	"cvwo-forum/internal/database"
	"cvwo-forum/internal/router"
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

	// Seed default topics
	defaultTopics := []string{"Tech", "Games", "Lifestyle", "Music", "Automotive", "Test"}
	for _, title := range defaultTopics {
		if err := database.SeedTopic(db, title); err != nil {
			log.Printf("Failed to seed topic '%s': %v", title, err)
		}
	}

	// Setup Router
	mux := router.SetupRouter(db)

	// Start server
	log.Println("Server starting on :8080")
	if err := http.ListenAndServe(":8080", mux); err != nil {
		log.Fatal(err)
	}
}
