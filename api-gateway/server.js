const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');

const app = express();
app.use(express.static(path.join(__dirname, 'public')));

// Proxy routes to services
app.use('/users', createProxyMiddleware({ target: 'http://localhost:3001', changeOrigin: true }));
app.use('/requests', createProxyMiddleware({ target: 'http://localhost:3002', changeOrigin: true }));
app.use('/notifications', createProxyMiddleware({ target: 'http://localhost:3003', changeOrigin: true }));
app.use('/donations', createProxyMiddleware({ target: 'http://localhost:3004', changeOrigin: true }));
app.use('/admin', createProxyMiddleware({ target: 'http://localhost:3005', changeOrigin: true }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(3000, () => console.log('API Gateway running on port 3000'));