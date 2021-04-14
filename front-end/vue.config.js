module.exports = {
  devServer: {
    port: 3000,
    proxy: { // front-end와 back-end사이 요청을 연결해주는 것!
      /*
        웹 어플리케이션의 요청
          - 페이지 요청 : 페이지렌더링 활용 => 프록시 필요X
          - API 요청 : 자바스크립트 동작에 활용 => 프록시 필요O
        두개의 요청을 구분하기 위해 api 요청은 특정 URL 패턴 적용 (.../api/...)
      */
      '/api/*': {
        target: 'http://192.168.1.23:8080'
      }
    }
  },
  configureWebpack: {
    entry: {
      app: './src/main.js',
      style: [
        'bootstrap/dist/css/bootstrap.min.css'
      ]
    }
  }
}
