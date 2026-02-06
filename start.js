const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const server = http.createServer((req, res) => {
  console.log(`요청: ${req.url}`);
  
  // 파일 경로 결정
  let filePath = './public' + (req.url === '/' ? '/index.html' : req.url);
  
  // 파일 읽기
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('파일을 찾을 수 없습니다');
      return;
    }
    
    // Content-Type 설정
    let contentType = 'text/html';
    if (filePath.endsWith('.json')) contentType = 'application/json';
    if (filePath.endsWith('.css')) contentType = 'text/css';
    if (filePath.endsWith('.js')) contentType = 'text/javascript';
    
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log('\n🎉 TrendBreaker 서버 시작!\n');
  console.log(`👉 http://localhost:${PORT}\n`);
  console.log(`👉 http://127.0.0.1:${PORT}\n`);
  console.log('브라우저에서 위 주소를 열어보세요!\n');
});
