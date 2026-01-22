package models

import "time"

type Topic struct {
	ID    int    `json:"id"`
	Title string `json:"title"`
}

type Post struct {
	ID        int       `json:"id"`
	Title     string    `json:"title"`
	Body      string    `json:"body"`
	Username  string    `json:"username"`
	TopicID   int       `json:"topic_id"`
	CreatedAt time.Time `json:"created_at"`
}

type Comment struct {
	ID        int       `json:"id"`
	Body      string    `json:"body"`
	Username  string    `json:"username"`
	PostID    int       `json:"post_id"`
	CreatedAt time.Time `json:"created_at"`
}
