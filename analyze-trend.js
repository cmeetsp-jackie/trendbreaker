require('dotenv').config();

/**
 * 트렌드 키워드를 분석하고 친근하고 신비로운 설명 생성
 * @param {string} keyword - 분석할 키워드
 * @returns {Promise<object>} 분석 결과
 */
async function analyzeTrend(keyword) {
  try {
    console.log(`🔮 "${keyword}" 분석 중...\n`);
    
    // 재주(나)에게 분석 요청
    // 실제로는 OpenClaw의 AI 기능을 활용
    const prompt = `
너는 트렌드 분석 전문가야. 친근하고 신비로운 톤으로 설명해줘.

키워드: "${keyword}"

다음 형식으로 분석해줘:

1. 한 줄 요약 (30자 이내, 임팩트 있게)
2. 배경 설명 (3-5문장, 왜 지금 트렌딩인지)
3. 왜 중요한지 (1문장)
4. 관련 키워드 (3개)

톤: 친근하고 신비로운 느낌, 이모지 적절히 사용
`;

    // 여기서는 형한테 분석을 요청하는 메시지만 생성
    // 실제 AI 분석은 재주(나)가 직접 할게요
    
    return {
      keyword,
      prompt,
      status: 'pending_analysis'
    };
    
  } catch (error) {
    console.error('❌ 분석 실패:', error.message);
    throw error;
  }
}

module.exports = { analyzeTrend };
