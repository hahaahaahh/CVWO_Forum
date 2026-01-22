package database

import (
	"cvwo-forum/internal/models"
	"database/sql"
)

func GetTopics(db *sql.DB) ([]models.Topic, error) {
	rows, err := db.Query("SELECT id, title FROM topics")
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
