package main

import (
	"fmt"
	"net/http"
)

func main() {
	fmt.Println("CVWO Backend Running")

	// Basic server setup (placeholder for future logic)
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "Welcome to Gossip with Go!")
	})

	// Use a common port
	// http.ListenAndServe(":8080", nil) 
}
