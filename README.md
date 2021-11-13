# 시나리오
1. 사용자가 도메인 검색
   1. Get 요청
      1. 성공하면 다음 단계
      2. 실패하면 실패 메시지 출력
   2. WebSocket 연결
      1. 성공하면 다음 단계
      2. 실패하면 실패 메시지 출력
   3. Hop 단위로 데이터를 받음
      1. WebSocket이 끊어지면 그대로 종료
      2. 중간에 서버에서 에러나면 그대로 종료
      3. 탐색 종료되면 다음 단계
   4. 탐색 끝 WebSocket 종료

# To Do
- [ ] 도메인 검색하면, 유효한 도메인인지 확인
- [ ] WebSocket 요청처리
  - 쿠키에서 요청한 도메인 확인
  - ip-trace로 hop마다 데이터 전송
  - close시 데이터 전송, socket close
  - error가 생길경우 socket close
  