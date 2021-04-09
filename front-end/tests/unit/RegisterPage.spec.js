// import { mount } from '@vue/test-utils'
import Vue from 'vue'
import RegisterPage from '@/views/RegisterPage'

describe('RegisterPage.vue', () => {
  it('should render correct contents', function () {
    const Constructor = Vue.extend(RegisterPage)
    const vm = new Constructor().$mount()

    expect(vm.$el.querySelector('.logo').getAttribute('src')).toEqual('/static/images/logo.png')
    expect(vm.$el.querySelector('.tagline').textContent).toEqual('Open source task management tool')
    expect(vm.$el.querySelector('#username').value).toEqual('')
    expect(vm.$el.querySelector('#emailAddress').value).toEqual('')
    expect(vm.$el.querySelector('#password').value).toEqual('')
    expect(vm.$el.querySelector('form button[type="submit"]').textContent).toEqual('Create account')
  })
})
  // let wrapper
  // let fieldUsername
  // let fieldEmailAddress
  // let fieldPassword
  // let buttonSubmit

  // console.log("초기화전 " + wrapper);

  // beforeEach(() => {
  //   console.log("초기화");
  //   wrapper = mount(RegisterPage);
  //   console.log("wrapper : " + wrapper);
  //   fieldUsername = wrapper.find('#username')
  //   fieldEmailAddress = wrapper.find('#emailAddress')
  //   fieldPassword = wrapper.find('#password')
  //   buttonSubmit = wrapper.find('form button[type="submit"]')
  // })

  // it('should render registration form', () => {// 예상값 함수
    // console.log("초기화 후  " + wrapper);
    // expect(wrapper.find('.logo').attributes().src)
    //   .toEqual('/static/images/logo.png')
    // expect(wrapper.find('.tagline').text())
    //   .toEqual('Open source task management tool')
    // expect(fieldUsername.element.value).toEqual('')
    // expect(fieldEmailAddress.element.value).toEqual('')
    // expect(fieldPassword.element.value).toEqual('')
    // expect(buttonSubmit.text()).toEqual('Create account')

  // })

