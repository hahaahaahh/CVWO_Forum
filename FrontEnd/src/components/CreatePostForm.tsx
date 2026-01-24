import { useState } from 'react';
import { Box, TextField, Button, Stack, Typography } from '@mui/material';
import { createPost } from '../services/api';
import { useAuth } from '../context/AuthContext';

interface CreatePostFormProps {
  topicId: string;
  onPostCreated: () => void;
}

const CreatePostForm = ({ topicId, onPostCreated }: CreatePostFormProps) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const { user } = useAuth();
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !body || !user) {
        setError('All fields are required');
        return;
    }

    try {
      await createPost(topicId, { title, body, username: user });
      setTitle('');
      setBody('');
      setError('');
      onPostCreated();
    } catch (err) {
      console.error("Failed to create post:", err);
      setError('Failed to create post');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4, p: 3, border: '1px solid #ddd', borderRadius: 2, backgroundColor: '#fff' }}>
      <Typography variant="h6" gutterBottom>Create New Post</Typography>
      <Stack spacing={2}>
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          required
        />
        <TextField
          label="Body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          multiline
          rows={3}
          fullWidth
          required
        />
        {error && <Typography color="error">{error}</Typography>}
        <Button variant="contained" type="submit" sx={{ alignSelf: 'flex-start' }}>
          Submit Post
        </Button>
      </Stack>
    </Box>
  );
};

export default CreatePostForm;
