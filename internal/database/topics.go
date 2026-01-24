package database

import (
	"cvwo-forum/internal/models"
	"database/sql"
)

func GetTopics(db *sql.DB, term string) ([]models.Topic, error) {
	var rows *sql.Rows
	var err error

	if term == "" {
		rows, err = db.Query("SELECT id, title FROM topics")
	} else {
		rows, err = db.Query("SELECT id, title FROM topics WHERE title LIKE ?", "%"+term+"%")
	}

	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var topics []models.Topic
	for rows.Next() {
		var t models.Topic
		if err := rows.Scan(&t.ID, &t.Title); err != nil {
			return nil, err
		}
		topics = append(topics, t)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	return topics, nil
}

func CreateTopic(db *sql.DB, title string) (int64, error) {
	query := "INSERT INTO topics (title) VALUES (?)"
	result, err := db.Exec(query, title)
	if err != nil {
		return 0, err
	}

	id, err := result.LastInsertId()
	if err != nil {
		return 0, err
	}

	return id, nil
}

func DeleteTopic(db *sql.DB, id int) error {
	query := "DELETE FROM topics WHERE id = ?"
	_, err := db.Exec(query, id)
	return err
}

func SeedTopic(db *sql.DB, title string) error {
	var count int
	err := db.QueryRow("SELECT COUNT(*) FROM topics WHERE title = ?", title).Scan(&count)
	if err != nil {
		return err
	}

	if count == 0 {
		_, err = db.Exec("INSERT INTO topics (title) VALUES (?)", title)
		return err
	}

	return nil
}
