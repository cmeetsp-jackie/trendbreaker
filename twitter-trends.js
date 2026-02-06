require('dotenv').config();
const { TwitterApi } = require('twitter-api-v2');

const client = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

/**
 * 트위터에서 한국 트렌딩 토픽 가져오기
 * WOEID 1132599 = Seoul, South Korea
 */
async function getTwitterTrends() {
  try {
    console.log('🔍 트위터 트렌딩 토픽 크롤링 중...\n');
    
    // 한국(서울) 트렌딩 토픽
    const trends = await client.v1.trendsAvailable();
    
    // 서울의 WOEID 찾기
    const seoul = trends.find(place => place.name === 'Seoul' || place.woeid === 1132599);
    
    if (!seoul) {
      console.log('⚠️ 서울 트렌드를 찾을 수 없습니다.');
      return [];
    }
    
    const seoulTrends = await client.v1.trendsByPlace(seoul.woeid);
    
    if (!seoulTrends || seoulTrends.length === 0) {
      console.log('⚠️ 트렌드 데이터가 없습니다.');
      return [];
    }
    
    const trendList = seoulTrends[0].trends.map(trend => ({
      name: trend.name,
      url: trend.url,
      tweetVolume: trend.tweet_volume || 0,
      query: trend.query
    }));
    
    // 트윗 볼륨 순으로 정렬 (볼륨 없는 건 뒤로)
    trendList.sort((a, b) => {
      if (a.tweetVolume === 0 && b.tweetVolume === 0) return 0;
      if (a.tweetVolume === 0) return 1;
      if (b.tweetVolume === 0) return -1;
      return b.tweetVolume - a.tweetVolume;
    });
    
    console.log(`✅ ${trendList.length}개의 트렌딩 토픽 발견!\n`);
    
    trendList.slice(0, 10).forEach((trend, i) => {
      const volume = trend.tweetVolume > 0 
        ? `${(trend.tweetVolume / 1000).toFixed(1)}K 트윗` 
        : '볼륨 정보 없음';
      console.log(`${i + 1}. ${trend.name} (${volume})`);
    });
    
    return trendList;
    
  } catch (error) {
    console.error('❌ 트렌드 크롤링 실패:', error.message);
    return [];
  }
}

// 테스트
if (require.main === module) {
  getTwitterTrends();
}

module.exports = { getTwitterTrends };
