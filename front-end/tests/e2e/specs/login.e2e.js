module.exports = {
  // 나이트왓치는 테스트 여러개 포함 가능 => 각 스텝들은 모듈에 속한 하나의 메소드로 각 메소드는 browser를 매개변수로 받음
  // 테스트 1.
  'login test': function (browser) {
    browser
      .url(process.env.VUE_DEV_SERVER_URL + 'login')
      .waitForElementVisible('#app', 5000)
      .assert.containsText('h1', 'TaskAgile')
      .end() // 테스트 종료, 셀레니움 세션 종료 
  }
}
