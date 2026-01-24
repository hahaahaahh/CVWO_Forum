import { useEffect, useState } from 'react';
import { Container, List, ListItem, ListItemText, Typography, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import { getTopics, type Topic } from '../services/api';

const TopicList = () => {
  const [topics, setTopics] = useState<Topic[]>([]);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const data = await getTopics();
        setTopics(data);
      } catch (error) {
        console.error("Failed to fetch topics:", error);
      }
    };

    fetchTopics();
  }, []);

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom component="div" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          Gossip with Go - Topics
        </Typography>
        <List>
          {topics.map((topic) => (
            <ListItem 
              key={topic.id} 
              component={Link} 
              to={`/topics/${topic.id}`}
              sx={{ 
                textDecoration: 'none', 
                color: 'inherit', 
                '&:hover': { backgroundColor: 'action.hover' } 
              }}
            >
              <ListItemText 
                primary={topic.title} 
                primaryTypographyProps={{ variant: 'h6' }}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
};

export default TopicList;
