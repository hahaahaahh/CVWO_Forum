package database

import (
	"cvwo-forum/internal/models"
	"database/sql"
)

func GetCommentsByPost(db *sql.DB, postID int) ([]models.Comment, error) {
	query := "SELECT id, body, username, post_id, created_at FROM comments WHERE post_id = ? ORDER BY created_at ASC"
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
	query := "INSERT INTO comments (body, username, post_id) VALUES (?, ?, ?)"
	result, err := db.Exec(query, comment.Body, comment.Username, comment.PostID)
	if err != nil {
		return 0, err
	}

	id, err := result.LastInsertId()
	if err != nil {
		return 0, err
	}

	return id, nil
}

func DeleteComment(db *sql.DB, id int) error {
	query := "DELETE FROM comments WHERE id = ?"
	_, err := db.Exec(query, id)
	return err
}
