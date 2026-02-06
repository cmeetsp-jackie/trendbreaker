/**
 * 수동으로 키워드 입력받아서 분석 요청
 */

const keyword = process.argv[2];

if (!keyword) {
  console.log('사용법: node manual-analyze.js "키워드"');
  process.exit(1);
}

console.log(`\n🔮 "${keyword}" 분석 요청\n`);
console.log('📌 재주에게 슬랙으로 분석을 요청합니다...\n');
console.log(`형, 슬랙으로 "${keyword}"에 대한 분석 결과를 보내드릴게요!\n`);

// 실제로는 여기서 재주(나)한테 슬랙 메시지 보내기
module.exports = { keyword };
