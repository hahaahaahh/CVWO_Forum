package main

import (
	"cvwo-forum/internal/database"
	"cvwo-forum/internal/router"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/joho/godotenv"
	"github.com/rs/cors"
)

func main() {
	// Load .env file if it exists (for local dev)
	_ = godotenv.Load()

	// Initialize Database
	dbURL := os.Getenv("DATABASE_URL")
	if dbURL == "" {
		log.Fatal("DATABASE_URL is not set")
	}
	fmt.Println("Connecting to Database:", dbURL)

	db, err := database.InitDB(dbURL)
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

	// Setup CORS
	c := cors.New(cors.Options{
		AllowedOrigins: []string{"*"},
		AllowedMethods: []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders: []string{"Content-Type", "Authorization", "X-Username"},
	})
	handler := c.Handler(mux)

	// Start server
	log.Println("Server starting on :8080")
	if err := http.ListenAndServe(":8080", handler); err != nil {
		log.Fatal(err)
	}
}
