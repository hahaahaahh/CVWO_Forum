package database

import (
	"cvwo-forum/internal/models"
	"database/sql"
)

func GetPostsByTopic(db *sql.DB, topicID int) ([]models.Post, error) {
	query := "SELECT id, title, body, username, topic_id, created_at FROM posts WHERE topic_id = ? ORDER BY created_at DESC"
	rows, err := db.Query(query, topicID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var posts []models.Post
	for rows.Next() {
		var p models.Post
		if err := rows.Scan(&p.ID, &p.Title, &p.Body, &p.Username, &p.TopicID, &p.CreatedAt); err != nil {
			return nil, err
		}
		posts = append(posts, p)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	return posts, nil
}

func CreatePost(db *sql.DB, post models.Post) (int64, error) {
	query := "INSERT INTO posts (title, body, username, topic_id) VALUES (?, ?, ?, ?)"
	result, err := db.Exec(query, post.Title, post.Body, post.Username, post.TopicID)
	if err != nil {
		return 0, err
	}

	id, err := result.LastInsertId()
	if err != nil {
		return 0, err
	}

	return id, nil
}

func DeletePost(db *sql.DB, id int) error {
	query := "DELETE FROM posts WHERE id = ?"
	_, err := db.Exec(query, id)
	return err
}

func UpdatePost(db *sql.DB, id int, title string, body string) error {
	query := "UPDATE posts SET title = ?, body = ? WHERE id = ?"
	_, err := db.Exec(query, title, body, id)
	return err
}
