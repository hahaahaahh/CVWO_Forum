import { type ReactElement } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CssBaseline, AppBar, Toolbar, Typography, Container, Box, Button } from '@mui/material';
import TopicList from './components/TopicList';
import PostList from './components/PostList';
import PostDetail from './components/PostDetail';
import Login from './components/Login';
import { AuthProvider, useAuth } from './context/AuthContext';

const RequireAuth = ({ children }: { children: ReactElement }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const NavBar = () => {
    const { user, logout } = useAuth();
    return (
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Gossip with Go
            </Typography>
            {user && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Typography variant="body2">Hello, {user}</Typography>
                    <Button color="inherit" onClick={logout}>Logout</Button>
                </Box>
            )}
          </Toolbar>
        </AppBar>
    );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CssBaseline />
        <Box sx={{ flexGrow: 1 }}>
          <NavBar />
          <Container>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<RequireAuth><TopicList /></RequireAuth>} />
              <Route path="/topics/:id" element={<RequireAuth><PostList /></RequireAuth>} />
              <Route path="/posts/:id" element={<RequireAuth><PostDetail /></RequireAuth>} />
            </Routes>
          </Container>
        </Box>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
