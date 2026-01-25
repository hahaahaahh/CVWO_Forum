package database

import (
	"cvwo-forum/internal/models"
	"database/sql"
)

func GetCommentsByPost(db *sql.DB, postID int) ([]models.Comment, error) {
	query := "SELECT id, body, username, post_id, created_at FROM comments WHERE post_id = $1 ORDER BY created_at ASC"
	rows, err := db.Query(query, postID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var comments []models.Comment
	for rows.Next() {
		var c models.Comment
		if err := rows.Scan(&c.ID, &c.Body, &c.Username, &c.PostID, &c.CreatedAt); err != nil {
			return nil, err
		}
		comments = append(comments, c)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	return comments, nil
}

func CreateComment(db *sql.DB, comment models.Comment) (int64, error) {
	var id int64
	query := "INSERT INTO comments (body, username, post_id) VALUES ($1, $2, $3) RETURNING id"
	err := db.QueryRow(query, comment.Body, comment.Username, comment.PostID).Scan(&id)
	if err != nil {
		return 0, err
	}

	return id, nil
}

func GetCommentAuthor(db *sql.DB, id int) (string, error) {
	var username string
	query := "SELECT username FROM comments WHERE id = $1"
	err := db.QueryRow(query, id).Scan(&username)
	if err != nil {
		return "", err
	}
	return username, nil
}

func DeleteComment(db *sql.DB, id int) error {
	query := "DELETE FROM comments WHERE id = $1"
	_, err := db.Exec(query, id)
	return err
}
