import { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Card, CardContent, Typography, Stack, Box, CardActionArea } from '@mui/material';
import { getPosts, type Post } from '../services/api';
import CreatePostForm from './CreatePostForm';

const PostList = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    try {
        const data = await getPosts(id);
        setPosts(Array.isArray(data) ? data : []);
    } catch (error) {
        console.error("Failed to fetch posts:", error);
        setPosts([]);
    } finally {
        setLoading(false);
    }
  }, [id]);
  
  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handlePostCreated = () => {
    fetchPosts();
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
       {id && <CreatePostForm topicId={id} onPostCreated={handlePostCreated} />}

       <Typography variant="h4" gutterBottom component="div" sx={{ fontWeight: 'bold', mb: 3 }}>
        Topic Posts
      </Typography>
      
      {loading ? (
        <Typography>Loading posts...</Typography>
      ) : (
        <Stack spacing={2}>
          {posts.length > 0 ? (
            posts.map((post) => (
              <Card key={post.id} variant="outlined">
                <CardActionArea onClick={() => navigate(`/posts/${post.id}`, { state: { post } })}>
                  <CardContent>
                    <Typography variant="h5" component="div" gutterBottom>
                      {post.title}
                    </Typography>
                    <Typography variant="body1" color="text.primary" paragraph>
                      {post.body}
                    </Typography>
                    <Box sx={{ mt: 1 }}>
                      <Typography variant="caption" color="text.secondary">
                          Posted by {post.username}
                      </Typography>
                    </Box>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))
          ) : (
            <Typography variant="body1" color="text.secondary">
                No posts yet in this topic.
            </Typography>
          )}
        </Stack>
      )}
    </Container>
  );
};

export default PostList;
