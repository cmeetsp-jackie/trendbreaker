require('dotenv').config();
const { TwitterApi } = require('twitter-api-v2');

const client = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

/**
 * 트위터 한국 트렌딩 토픽 크롤링
 * WOEID 1132599 = Seoul, South Korea
 */
async function getTwitterTrends() {
  try {
    console.log('🐦 트위터 트렌딩 크롤링 중...\n');
    
    // 한국(서울) 트렌딩 토픽
    const trends = await client.v1.trendsByPlace(1132599);
    
    if (!trends || trends.length === 0) {
      console.log('⚠️ 트위터 트렌드 없음\n');
      return [];
    }
    
    const trendList = trends[0].trends
      .filter(t => t.tweet_volume) // 볼륨 있는 것만
      .sort((a, b) => b.tweet_volume - a.tweet_volume) // 볼륨 순 정렬
      .slice(0, 10) // 상위 10개
      .map((trend, i) => ({
        id: i + 1,
        keyword: trend.name.replace('#', ''),
        rank: i + 1,
        summary: `트위터에서 ${(trend.tweet_volume / 1000).toFixed(1)}K 트윗과 함께 화제`,
        description: `${trend.name}가 트위터에서 트렌딩 중입니다. 실시간으로 많은 사람들이 이야기하고 있습니다.`,
        importance: '트위터에서 가장 핫한 토픽',
        relatedKeywords: ['트위터', '트렌딩', '실시간'],
        tweetVolume: trend.tweet_volume,
        timestamp: new Date().toISOString(),
        url: trend.url,
        source: 'twitter'
      }));
    
    console.log(`✅ 트위터 ${trendList.length}개 트렌드 수집!\n`);
    
    trendList.forEach(t => {
      console.log(`${t.rank}. ${t.keyword} (${(t.tweetVolume / 1000).toFixed(1)}K)`);
    });
    console.log('\n');
    
    return trendList;
    
  } catch (error) {
    if (error.code === 453) {
      console.log('⚠️ 트위터 API Basic tier 필요 ($100/월)\n');
      console.log('👉 https://developer.twitter.com/en/portal/products\n');
    } else {
      console.error('❌ 트위터 크롤링 실패:', error.message);
    }
    return [];
  }
}

module.exports = { getTwitterTrends };

// 테스트
if (require.main === module) {
  getTwitterTrends();
}
