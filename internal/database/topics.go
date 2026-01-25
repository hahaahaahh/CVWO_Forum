package database

import (
	"cvwo-forum/internal/models"
	"database/sql"
)

func GetTopics(db *sql.DB, term string) ([]models.Topic, error) {
	var rows *sql.Rows
	var err error

	if term == "" {
		rows, err = db.Query("SELECT id, title, username FROM topics")
	} else {
		rows, err = db.Query("SELECT id, title, username FROM topics WHERE title LIKE $1", "%"+term+"%")
	}

	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var topics []models.Topic
	for rows.Next() {
		var t models.Topic
		if err := rows.Scan(&t.ID, &t.Title, &t.Username); err != nil {
			return nil, err
		}
		topics = append(topics, t)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	return topics, nil
}

func CreateTopic(db *sql.DB, title string, username string) (int64, error) {
	var id int64
	query := "INSERT INTO topics (title, username) VALUES ($1, $2) RETURNING id"
	err := db.QueryRow(query, title, username).Scan(&id)
	if err != nil {
		return 0, err
	}

	return id, nil
}

func GetTopicAuthor(db *sql.DB, id int) (string, error) {
	var username string
	query := "SELECT username FROM topics WHERE id = $1"
	err := db.QueryRow(query, id).Scan(&username)
	if err != nil {
		return "", err
	}
	return username, nil
}

func DeleteTopic(db *sql.DB, id int) error {
	query := "DELETE FROM topics WHERE id = $1"
	_, err := db.Exec(query, id)
	return err
}

func SeedTopic(db *sql.DB, title string) error {
	var count int
	err := db.QueryRow("SELECT COUNT(*) FROM topics WHERE title = $1", title).Scan(&count)
	if err != nil {
		return err
	}

	if count == 0 {
		_, err = db.Exec("INSERT INTO topics (title, username) VALUES ($1, $2)", title, "System")
		return err
	}

	return nil
}
