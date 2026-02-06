require('dotenv').config();
const https = require('https');

// 트위터 API v2로 현재 사용자 정보 가져오기
const options = {
  hostname: 'api.twitter.com',
  path: '/2/users/me',
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${process.env.TWITTER_BEARER_TOKEN}`
  }
};

console.log('🔍 트위터 API 연결 테스트 중...\n');

const req = https.request(options, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    try {
      const response = JSON.parse(data);
      
      if (response.data) {
        console.log('✅ API 연결 성공!\n');
        console.log('계정 정보:');
        console.log(`- ID: ${response.data.id}`);
        console.log(`- Username: @${response.data.username}`);
        console.log(`- Name: ${response.data.name}`);
      } else if (response.errors) {
        console.log('❌ API 에러:', response.errors);
      } else {
        console.log('⚠️ 예상치 못한 응답:', response);
      }
    } catch (e) {
      console.log('❌ 파싱 에러:', e.message);
      console.log('Raw response:', data);
    }
  });
});

req.on('error', (e) => {
  console.error('❌ 요청 실패:', e.message);
});

req.end();
