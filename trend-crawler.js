const googleTrends = require('google-trends-api');

/**
 * 구글 트렌드에서 한국 실시간 트렌딩 키워드 가져오기
 */
async function getRealTimeTrends() {
  try {
    console.log('🔍 구글 트렌드 크롤링 중...\n');
    
    // 한국 실시간 트렌드
    const results = await googleTrends.realTimeTrends({
      geo: 'KR',
      category: 'all'
    });
    
    const data = JSON.parse(results);
    
    if (!data.storySummaries || !data.storySummaries.trendingStories) {
      console.log('⚠️ 트렌드 데이터가 없습니다.');
      return [];
    }
    
    const trends = data.storySummaries.trendingStories.map(story => {
      return {
        title: story.title,
        traffic: story.entityNames ? story.entityNames[0] : story.title,
        articles: story.articles ? story.articles.length : 0,
        image: story.image ? story.image.imgUrl : null,
        link: story.articles && story.articles[0] ? story.articles[0].url : null
      };
    });
    
    console.log(`✅ ${trends.length}개의 트렌드 발견!\n`);
    
    trends.slice(0, 5).forEach((trend, i) => {
      console.log(`${i + 1}. ${trend.title}`);
      console.log(`   키워드: ${trend.traffic}`);
      console.log(`   관련 기사: ${trend.articles}개\n`);
    });
    
    return trends;
    
  } catch (error) {
    console.error('❌ 트렌드 크롤링 실패:', error.message);
    return [];
  }
}

// 테스트
if (require.main === module) {
  getRealTimeTrends();
}

module.exports = { getRealTimeTrends };
