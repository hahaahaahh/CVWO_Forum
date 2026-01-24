package database

import (
	"cvwo-forum/internal/models"
	"database/sql"
)

func GetPostsByTopic(db *sql.DB, topicID int, searchQuery string) ([]models.Post, error) {
	var rows *sql.Rows
	var err error

	if searchQuery == "" {
		query := "SELECT id, title, body, username, topic_id, created_at FROM posts WHERE topic_id = ? ORDER BY created_at DESC"
		rows, err = db.Query(query, topicID)
	} else {
		query := "SELECT id, title, body, username, topic_id, created_at FROM posts WHERE topic_id = ? AND (title LIKE ? OR body LIKE ?) ORDER BY created_at DESC"
		searchTerm := "%" + searchQuery + "%"
		rows, err = db.Query(query, topicID, searchTerm, searchTerm)
	}

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

func GetPostAuthor(db *sql.DB, id int) (string, error) {
	var username string
	query := "SELECT username FROM posts WHERE id = ?"
	err := db.QueryRow(query, id).Scan(&username)
	if err != nil {
		return "", err
	}
	return username, nil
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
