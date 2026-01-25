package database

import (
	"database/sql"
	"log"
	"os"

	_ "github.com/lib/pq"
)

func InitDB(connStr string) (*sql.DB, error) {
	db, err := sql.Open("postgres", connStr)
	if err != nil {
		return nil, err
	}

	if err := db.Ping(); err != nil {
		return nil, err
	}

	// Read and execute schema
	fileContent, err := os.ReadFile("schema.sql")
	if err != nil {
		return nil, err
	}

	if _, err := db.Exec(string(fileContent)); err != nil {
		return nil, err
	}

	log.Println("Database initialized successfully")

	return db, nil
}
