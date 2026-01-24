import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CssBaseline, AppBar, Toolbar, Typography, Container, Box } from '@mui/material';
import TopicList from './components/TopicList';
import PostList from './components/PostList';

function App() {
  return (
    <BrowserRouter>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Gossip with Go
            </Typography>
          </Toolbar>
        </AppBar>
        <Container>
          <Routes>
            <Route path="/" element={<TopicList />} />
            <Route path="/topics/:id" element={<PostList />} />
          </Routes>
        </Container>
      </Box>
    </BrowserRouter>
  );
}

export default App;
