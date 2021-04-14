import Vue from 'vue'
import LoginPage from '@/views/LoginPage'

describe('LoginPage.vue', () => { // 하나의 테스트 스위트
  it('should render correct contents', () => {
    const Constructor = Vue.extend(LoginPage) // Vue하위클래스인 LoginPage 생성
    const vm = new Constructor().$mount() // $mont : LoginPage Vue가 페이지에 랜더링 되었다고 생각하면됨!
    expect(vm.$el.querySelector('h1').textContent)
      .toEqual('TaskAgile')
  })
})
