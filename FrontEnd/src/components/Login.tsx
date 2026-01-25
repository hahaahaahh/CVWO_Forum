import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Paper, TextField, Button, Typography, Box, Alert } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { signup as apiSignup } from '../services/api';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!username.trim() || !password.trim()) return;

    try {
        if (isSignup) {
            await apiSignup(username, password);
            // Auto login after signup or switch to login mode?
            // Let's switch to login mode for clarity
            setIsSignup(false);
            setError(''); // Clear any previous errors
            alert("Account created! Please login.");
        } else {
            await login(username, password);
            navigate('/');
        }
    } catch (err: any) {
        console.error("Auth error:", err);
        if (isSignup) {
             setError("Signup failed. Username already exists?");
        } else {
             setError("Login failed. Invalid credentials.");
        }
    }
  };

  const handleToggleMode = () => {
    setIsSignup(!isSignup);
    setUsername("");
    setPassword("");
    setError("");
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 8 }}>
      <Paper elevation={0} sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', borderRadius: 2 }}>
        <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
          CVWO Web Forum
        </Typography>
        <Typography component="h2" variant="h6" color="text.secondary" sx={{ mb: 3 }}>
          {isSignup ? 'Sign Up' : 'Login'}
        </Typography>
        
        {error && <Alert severity="error" sx={{ width: '100%', mb: 2 }}>{error}</Alert>}

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {isSignup ? 'Sign Up' : 'Sign In'}
          </Button>
          <Button
            fullWidth
            variant="text"
            onClick={handleToggleMode}
          >
            {isSignup ? "Already have an account? Login" : "Don't have an account? Sign Up"}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
