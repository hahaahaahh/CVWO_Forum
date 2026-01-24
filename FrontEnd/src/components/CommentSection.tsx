import { useState, useEffect, useCallback } from 'react';
import { Box, Typography, List, ListItem, ListItemText, TextField, Button, Divider, Paper, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { getComments, createComment, deleteComment, type Comment } from '../services/api';
import { useAuth } from '../context/AuthContext';

interface CommentSectionProps {
  postId: string;
}

const CommentSection = ({ postId }: CommentSectionProps) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  const fetchComments = useCallback(async () => {
    try {
      const data = await getComments(postId);
      setComments(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch comments:", error);
      setComments([]);
    } finally {
        setLoading(false);
    }
  }, [postId]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment || !user) return;

    try {
      await createComment(postId, { body: newComment, username: user });
      setNewComment('');
      fetchComments();
    } catch (error) {
      console.error("Failed to post comment:", error);
    }
  };

  const handleDelete = async (commentId: number) => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
        try {
            await deleteComment(commentId);
            fetchComments();
        } catch (error) {
            console.error("Failed to delete comment:", error);
        }
    }
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Divider sx={{ mb: 2 }} />
      <Typography variant="h6" gutterBottom>
        Comments
      </Typography>
      
      {loading ? (
        <Typography variant="body2" color="text.secondary">Loading comments...</Typography>
      ) : (
        <List dense>
            {comments.length === 0 ? (
                 <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                 No comments yet.
               </Typography>
            ) : (
                comments.map((comment) => (
                    <Paper key={comment.id} variant="outlined" sx={{ mb: 1, p: 1, backgroundColor: '#f9f9f9' }}>
                        <ListItem alignItems="flex-start" sx={{ px: 1, py: 0 }}
                            secondaryAction={
                                <IconButton edge="end" aria-label="delete" size="small" onClick={() => handleDelete(comment.id)}>
                                    <DeleteIcon fontSize="inherit" />
                                </IconButton>
                            }
                        >
                            <ListItemText
                            primary={
                                <Typography variant="subtitle2" component="span" sx={{ fontWeight: 'bold' }}>
                                {comment.username}
                                </Typography>
                            }
                            secondary={
                                <Typography variant="body2" color="text.primary">
                                {comment.body}
                                </Typography>
                            }
                            />
                        </ListItem>
                    </Paper>
                ))
            )}
        </List>
      )}

      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Add a comment..."
          variant="outlined"
          size="small"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          multiline
          rows={2}
          required
          fullWidth
        />
        <Button variant="contained" type="submit" size="small" sx={{ alignSelf: 'flex-start' }}>
          Post Comment
        </Button>
      </Box>
    </Box>
  );
};

export default CommentSection;
