import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, Container, Button, Stack, TextField } from '@mui/material';
import CommentSection from './CommentSection';
import { type Post, deletePost, updatePost } from '../services/api';

const PostDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // Initialize local state with the post from navigation state
  const [post, setPost] = useState<Post | undefined>(location.state?.post as Post | undefined);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(post?.title || '');
  const [editBody, setEditBody] = useState(post?.body || '');

  const handleDelete = async () => {
    if (!post) return;
    if (window.confirm("Are you sure you want to delete this post?")) {
        try {
            await deletePost(post.id);
            navigate(`/topics/${post.topic_id}`);
        } catch (error) {
            console.error("Failed to delete post:", error);
        }
    }
  };

  const handleUpdate = async () => {
    if (!post) return;
    try {
        await updatePost(post.id, { title: editTitle, body: editBody });
        setPost({ ...post, title: editTitle, body: editBody });
        setIsEditing(false);
    } catch (error) {
        console.error("Failed to update post:", error);
    }
  };

  if (!post) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Post not found or loaded incorrectly.
        </Typography>
        <Button variant="outlined" onClick={() => navigate(-1)}>
          Go Back
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
        <Button variant="outlined" onClick={() => navigate(-1)}>
            Back to Topic
        </Button>
        {isEditing ? (
            <>
                <Button variant="contained" color="primary" onClick={handleUpdate}>
                    Save
                </Button>
                <Button variant="outlined" onClick={() => setIsEditing(false)}>
                    Cancel
                </Button>
            </>
        ) : (
            <>
                <Button variant="contained" onClick={() => setIsEditing(true)}>
                    Edit Post
                </Button>
                <Button variant="contained" color="error" onClick={handleDelete}>
                    Delete Post
                </Button>
            </>
        )}
      </Stack>

      <Card variant="outlined" sx={{ mb: 4 }}>
        <CardContent>
            {isEditing ? (
                <Stack spacing={2}>
                    <TextField
                        label="Title"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        fullWidth
                    />
                    <TextField
                        label="Body"
                        value={editBody}
                        onChange={(e) => setEditBody(e.target.value)}
                        multiline
                        rows={4}
                        fullWidth
                    />
                </Stack>
            ) : (
                <>
                    <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
                        {post.title}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                        Posted by {post.username}
                    </Typography>
                    <Typography variant="body1" paragraph sx={{ mt: 2, whiteSpace: 'pre-wrap' }}>
                        {post.body}
                    </Typography>
                </>
            )}
        </CardContent>
      </Card>

      <CommentSection postId={post.id.toString()} />
    </Container>
  );
};

export default PostDetail;
