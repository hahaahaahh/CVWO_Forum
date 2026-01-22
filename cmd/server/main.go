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

	// Setup Router
	mux := router.SetupRouter(db)

	// Start server
	log.Println("Server starting on :8080")
	if err := http.ListenAndServe(":8080", mux); err != nil {
		log.Fatal(err)
	}
}
