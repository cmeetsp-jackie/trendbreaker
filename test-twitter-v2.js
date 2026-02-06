require('dotenv').config();
const { TwitterApi } = require('twitter-api-v2');

// OAuth 1.0a User Context로 클라이언트 생성
const client = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

async function testTwitterAPI() {
  try {
    console.log('🔍 트위터 API 연결 테스트 중...\n');
    
    // 현재 사용자 정보 가져오기
    const me = await client.v2.me();
    
    console.log('✅ API 연결 성공!\n');
    console.log('계정 정보:');
    console.log(`- ID: ${me.data.id}`);
    console.log(`- Username: @${me.data.username}`);
    console.log(`- Name: ${me.data.name}`);
    console.log('\n🎉 트위터 API 준비 완료!\n');
    
  } catch (error) {
    console.error('❌ API 에러:', error);
  }
}

testTwitterAPI();
