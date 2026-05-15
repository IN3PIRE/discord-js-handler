const express = require('express');

const setupHealthCheck = (client, port = 3000) => {
  const app = express();
  
  app.get('/health', (req, res) => {
    res.json({
      status: 'ok',
      ping: client.ws.ping,
      uptime: process.uptime()
    });
  });

  app.listen(port, () => {
    console.log(`[Info]: Health check endpoint listening on port ${port}`);
  });
};

module.exports = setupHealthCheck;
