const { createProxyMiddleware } = require('http-proxy-middleware');
const { services } = require('./gateway.config');

module.exports = function(app) {

    // Users Service
    app.use(
        '/users',
        createProxyMiddleware({
            target: services.users,
            changeOrigin: true
        })
    );

    // Request Service
    app.use(
        '/requests',
        createProxyMiddleware({
            target: services.requests,
            changeOrigin: true
        })
    );

    // Notification Service
    app.use(
        '/notifications',
        createProxyMiddleware({
            target: services.notifications,
            changeOrigin: true
        })
    );

    // Donation Service
    app.use(
        '/donations',
        createProxyMiddleware({
            target: services.donations,
            changeOrigin: true
        })
    );

    // Admin Service
    app.use(
        '/admin',
        createProxyMiddleware({
            target: services.admin,
            changeOrigin: true
        })
    );
};
