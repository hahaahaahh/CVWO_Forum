package database

import (
	"database/sql"

	"golang.org/x/crypto/bcrypt"
)

func CreateUser(db *sql.DB, username, password string) error {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return err
	}

	query := "INSERT INTO users (username, password) VALUES ($1, $2)"
	_, err = db.Exec(query, username, string(hashedPassword))
	return err
}

func AuthenticateUser(db *sql.DB, username, password string) bool {
	var hashedPassword string
	query := "SELECT password FROM users WHERE username = $1"
	err := db.QueryRow(query, username).Scan(&hashedPassword)
	if err != nil {
		return false
	}

	err = bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(password))
	return err == nil
}
