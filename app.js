const express = require('express');
const app = express();

app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

app.get('/ready', (req, res) => {
  res.status(200).json({ 
    status: 'ready',
    service: 'nodejs-ecs-api'
  });
});

app.get('/api/users', (req, res) => {
  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com' }
  ];
  res.json({ success: true, data: users });
});

app.get('/api/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com' }
  ];
  
  const user = users.find(u => u.id === userId);
  
  if (user) {
    res.json({ success: true, data: user });
  } else {
    res.status(404).json({ success: false, message: 'User not found' });
  }
});

app.post('/api/users', (req, res) => {
  const { name, email } = req.body;
    
  if (!name || !email) {
    return res.status(400).json({ 
      success: false, 
      message: 'Name and email are required' 
    });
  }
  
  const newUser = {
    id: Date.now(),
    name,
    email
  };
  
  res.status(201).json({ success: true, data: newUser });
});

app.get('/api/info', (req, res) => {
  res.json({
    success: true,
    data: {
      service: 'Node.js ECS API',
      version: '1.0.0',
      environment: process.env.NODE_ENV || 'development',
      nodeVersion: process.version
    }
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Node.js API for ECS',
    endpoints: {
      health: '/health',
      ready: '/ready',
      users: '/api/users',
      userById: '/api/users/:id',
      info: '/api/info',
      testing: '/api/testing',
      newUser: 'newTesting'
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    message: 'Internal server error' 
  });
});

const PORT = 5000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});