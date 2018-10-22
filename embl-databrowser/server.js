const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
const port = process.env.PORT || 8080;
app.use(require('express-status-monitor')({
  title: 'EMBL Data Browser Statistics',
  path: '/api/status',
  healthChecks: [{
    protocol: 'http',
    host: '0.0.0.0',
    path: '/api/health',
    port: port
  }]
  }));
app.use(express.static(path.join(__dirname, 'build')));

app.get('/api/health', function (req, res) {
 return res.send('UP');
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


app.listen(port, () => console.log(`Listening on port ${port}`));