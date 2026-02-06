const axios = require('axios');
const cheerio = require('cheerio');

/**
 * 네이버 쇼핑 인기 검색어 크롤링
 */
async function getNaverTrends() {
  try {
    console.log('🔍 네이버 트렌드 크롤링 중...\n');
    
    // 네이버 쇼핑 인기 검색어 페이지
    const response = await axios.get('https://shopping.naver.com/home', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
      }
    });
    
    const $ = cheerio.load(response.data);
    const trends = [];
    
    // 네이버 쇼핑 인기 검색어 추출 (HTML 구조에 따라 조정 필요)
    $('.popular_keyword_item').each((i, elem) => {
      const keyword = $(elem).text().trim();
      if (keyword) {
        trends.push({
          rank: i + 1,
          keyword: keyword,
          source: 'naver_shopping'
        });
      }
    });
    
    if (trends.length === 0) {
      console.log('⚠️ 네이버 쇼핑에서 트렌드를 찾을 수 없습니다.');
      console.log('💡 대신 수동 입력 방식을 사용하세요!\n');
    } else {
      console.log(`✅ ${trends.length}개의 인기 검색어 발견!\n`);
      trends.slice(0, 10).forEach(trend => {
        console.log(`${trend.rank}. ${trend.keyword}`);
      });
    }
    
    return trends;
    
  } catch (error) {
    console.error('❌ 네이버 크롤링 실패:', error.message);
    console.log('\n💡 네이버 크롤링이 작동하지 않을 수 있습니다.');
    console.log('   대신 수동 입력 방식을 사용하세요: "트렌드 분석: 키워드"\n');
    return [];
  }
}

// 테스트
if (require.main === module) {
  getNaverTrends();
}

module.exports = { getNaverTrends };
