# 시나리오
1. 사용자가 도메인 검색
   1. WebSocket 연결
      1. 성공하면 다음 단계
      2. 실패하면 실패 메시지 출력
   2. 검색한 도메인 확인
      1. iptrace로 검색한 도메인이 유효한지 확인. 최대 1초까지 기다림
         1. 성공하면 다음 단계
         2. 실패하면 socket으로 실패 메시지 보낸 뒤, socket 종료
   3. Hop 단위로 데이터를 전송
      1. iptrace에서 hop단위로 데이터를 받은 후 호스트에게 전송
   4. WebSocket이 끊어지면 client 소켓 삭제

# To Do
- [x] WebSocket 요청처리
  - ip-trace로 hop마다 데이터 전송
  - close시 데이터 전송, socket close
  - error가 생길경우 socket close
- [ ] 사용자가 피드백 전송시 내 이메일로 전송
   - [ ] 이메일모듈을 이 프로젝트에서 추출하고 nest모듈로 만들어 npm으로 배포
   - [ ] 이메일 모듈 확장
