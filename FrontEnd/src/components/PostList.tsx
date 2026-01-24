import { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate, useLocation, Link as RouterLink } from 'react-router-dom';
import { Card, CardContent, Typography, Stack, Box, CardActionArea, TextField, Button, Breadcrumbs, Link } from '@mui/material';
import { getPosts, type Post } from '../services/api';
import CreatePostForm from './CreatePostForm';

const PostList = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const topicTitle = location.state?.title || "Topic " + id;
  const [posts, setPosts] = useState<Post[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchPosts = useCallback(async (query: string = "") => {
    if (!id) return;
    setLoading(true);
    try {
        const data = await getPosts(id, query);
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

  const handleSearch = () => {
    fetchPosts(searchQuery);
  };

  return (
    <Box>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
        <Link component={RouterLink} to="/" color="inherit">Home</Link>
        <Typography color="text.primary">{topicTitle}</Typography>
      </Breadcrumbs>

      <Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search posts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        <Button variant="contained" onClick={handleSearch}>
          Search
        </Button>
      </Box>

      {id && <CreatePostForm topicId={id} onPostCreated={handlePostCreated} />}

      <Typography variant="h4" gutterBottom component="div" sx={{ fontWeight: 'bold', mb: 3 }}>
        {topicTitle}
      </Typography>
      
      {loading ? (
        <Typography>Loading posts...</Typography>
      ) : (
        <Stack spacing={2}>
          {posts.length > 0 ? (
            posts.map((post) => (
              <Card key={post.id} variant="outlined">
                <CardActionArea onClick={() => navigate(`/posts/${post.id}`, { state: { post, topicTitle } })}>
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
    </Box>
  );
};

export default PostList;
