package database

import (
	"cvwo-forum/internal/models"
	"database/sql"
)

func GetPostsByTopic(db *sql.DB, topicID int, searchQuery string) ([]models.Post, error) {
	var rows *sql.Rows
	var err error

	if searchQuery == "" {
		query := "SELECT id, title, body, username, topic_id, created_at FROM posts WHERE topic_id = $1 ORDER BY created_at DESC"
		rows, err = db.Query(query, topicID)
	} else {
		query := "SELECT id, title, body, username, topic_id, created_at FROM posts WHERE topic_id = $1 AND (title LIKE $2 OR body LIKE $3) ORDER BY created_at DESC"
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
	var id int64
	query := "INSERT INTO posts (title, body, username, topic_id) VALUES ($1, $2, $3, $4) RETURNING id"
	err := db.QueryRow(query, post.Title, post.Body, post.Username, post.TopicID).Scan(&id)
	if err != nil {
		return 0, err
	}

	return id, nil
}

func GetPostAuthor(db *sql.DB, id int) (string, error) {
	var username string
	query := "SELECT username FROM posts WHERE id = $1"
	err := db.QueryRow(query, id).Scan(&username)
	if err != nil {
		return "", err
	}
	return username, nil
}

func DeletePost(db *sql.DB, id int) error {
	query := "DELETE FROM posts WHERE id = $1"
	_, err := db.Exec(query, id)
	return err
}

func UpdatePost(db *sql.DB, id int, title string, body string) error {
	query := "UPDATE posts SET title = $1, body = $2 WHERE id = $3"
	_, err := db.Exec(query, title, body, id)
	return err
}
