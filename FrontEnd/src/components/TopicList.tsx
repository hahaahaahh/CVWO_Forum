import { useEffect, useState, useCallback } from 'react';
import { Box, List, ListItem, ListItemText, Typography, Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import { getTopics, createTopic, deleteTopic, type Topic } from '../services/api';
import { useAuth } from '../context/AuthContext';

const TopicList = () => {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [newTopicTitle, setNewTopicTitle] = useState('');
  const { user } = useAuth();

  const fetchTopics = useCallback(async (query: string = "") => {
    try {
      const data = await getTopics(query);
      setTopics(data);
    } catch (error) {
      console.error("Failed to fetch topics:", error);
    }
  }, []);

  useEffect(() => {
    fetchTopics();
  }, [fetchTopics]);

  const handleSearch = () => {
    fetchTopics(searchQuery);
  };

  const handleCreateTopic = async () => {
    if (!newTopicTitle.trim()) return;
    try {
        await createTopic(newTopicTitle);
        setNewTopicTitle('');
        setOpen(false);
        fetchTopics();
    } catch (error) {
        console.error("Failed to create topic:", error);
    }
  };

  const handleDeleteTopic = async (e: React.MouseEvent, id: number) => {
    e.preventDefault(); // Prevent navigation
    if (window.confirm("Are you sure you want to delete this topic? All posts inside will be deleted.")) {
        try {
            await deleteTopic(id);
            fetchTopics();
        } catch (error) {
            console.error("Failed to delete topic:", error);
        }
    }
  };

  return (
    <Box>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
            CVWO Web Forum - Topics
            </Typography>
            <Button variant="contained" onClick={() => setOpen(true)}>
                Create Topic
            </Button>
        </Box>

        <Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
            <TextField
                fullWidth
                size="small"
                variant="outlined"
                placeholder="Search topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <Button variant="contained" onClick={handleSearch}>
                Search
            </Button>
        </Box>

        <List>
          {topics.map((topic) => (
            <ListItem 
              key={topic.id} 
              component={Link} 
              to={`/topics/${topic.id}`}
              state={{ title: topic.title }}
              sx={{ 
                textDecoration: 'none', 
                color: 'inherit', 
                '&:hover': { backgroundColor: 'action.hover' } 
              }}
              secondaryAction={
                user === topic.username && (
                <IconButton edge="end" aria-label="delete" onClick={(e) => handleDeleteTopic(e, topic.id)} color="error">
                  <DeleteIcon />
                </IconButton>
                )
              }
            >
              <ListItemText 
                primary={topic.title} 
                secondary={
                  <Typography variant="caption" sx={{ display: 'block', color: 'text.secondary' }}>
                    Created by {topic.username}
                  </Typography>
                }
                primaryTypographyProps={{ variant: 'h6' }}
              />
            </ListItem>
          ))}
        </List>
      </Paper>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Create New Topic</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Topic Title"
            fullWidth
            variant="outlined"
            value={newTopicTitle}
            onChange={(e) => setNewTopicTitle(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleCreateTopic} variant="contained">Create</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TopicList;
