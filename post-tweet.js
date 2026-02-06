require('dotenv').config();
const { TwitterApi } = require('twitter-api-v2');

const client = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

/**
 * 트윗 발행
 * @param {string} text - 트윗 내용
 * @returns {Promise<object>} 트윗 결과
 */
async function postTweet(text) {
  try {
    console.log('🐦 트윗 발행 중...\n');
    console.log('내용:\n' + text + '\n');
    
    const tweet = await client.v2.tweet(text);
    
    const tweetUrl = `https://twitter.com/${tweet.data.id}`;
    
    console.log('✅ 트윗 발행 완료!');
    console.log(`🔗 ${tweetUrl}\n`);
    
    return {
      success: true,
      tweetId: tweet.data.id,
      url: tweetUrl,
      text: text
    };
    
  } catch (error) {
    console.error('❌ 트윗 발행 실패:', error.message);
    throw error;
  }
}

// 테스트용
if (require.main === module) {
  const testText = process.argv[2] || '🔮 TrendBreaker 테스트 트윗\n\n친근하고 신비로운 트렌드 분석 봇이 깨어났습니다! ✨';
  postTweet(testText);
}

module.exports = { postTweet };
