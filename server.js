const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8890;
const PUBLIC_DIR = path.join(__dirname, 'public');

const mimeTypes = {
  '.html': 'text/html',
  '.json': 'application/json',
  '.css': 'text/css',
  '.js': 'text/javascript',
};

const server = http.createServer((req, res) => {
  let filePath = path.join(PUBLIC_DIR, req.url === '/' ? 'index.html' : req.url);
  const ext = path.extname(filePath);
  const contentType = mimeTypes[ext] || 'text/plain';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404);
      res.end('404 Not Found');
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    }
  });
});

server.listen(PORT, () => {
  console.log(`🚀 TrendBreaker 서버 시작!`);
  console.log(`👉 http://localhost:${PORT}`);
});
