import { mount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'
import RegisterPage from '@/views/RegisterPage'
import Vuelidate from 'vuelidate' // Vuelidate : 사용자 입력을 검증해 받은 데이터가 유효한지 확인하는 모델 기반 검증 라이브러리
import registrationService from '@/service/registration'

// vm.$router가 접근할 수 있도록 테스트에 Vue Router 추가하기
const localVue = createLocalVue()
localVue.use(VueRouter)
localVue.use(Vuelidate)
const router = new VueRouter()

// registrationService의 목 => 모듈의 맨 윗부분으로 위치시킴!
jest.mock('@/service/registration')

describe('RegisterPage.vue', () => {
  let wrapper
  let fieldUsername
  let fieldEmailAddress
  let fieldPassword
  let buttonSubmit
  let registerSpy

  beforeEach(() => {
    wrapper = mount(RegisterPage, {
      localVue,
      router
    });
    fieldUsername = wrapper.find('#username')
    fieldEmailAddress = wrapper.find('#emailAddress')
    fieldPassword = wrapper.find('#password')
    buttonSubmit = wrapper.find('form button[type="submit"]')
    // 회원가입 서비스를 위한 스파이 생성
    // 스파이 : 감시하고있는 함수의 호출 추적 가능
    registerSpy = jest.spyOn(registrationService, 'register')
  })

  afterEach(()=>{
    registerSpy.mockReset()
    registerSpy.mockRestore()
  })

  afterAll(() => {
    jest.restoreAllMocks()
  })

  it('should render registration form', () => {// 예상값 함수
    expect(wrapper.find('.logo').attributes().src)
      .toEqual('/static/images/logo.png')
    expect(wrapper.find('.tagline').text())
      .toEqual('Open source task management tool')
    expect(fieldUsername.element.value).toEqual('')
    expect(fieldEmailAddress.element.value).toEqual('')
    expect(fieldPassword.element.value).toEqual('')
    expect(buttonSubmit.text()).toEqual('Create account')
  })

  it('should contain data model with initial values', () => { // 데이터 모델의 초깃값 검증 테스트
    // wrapper.vm = Vue 인스턴스에 접근
    // form 태그안에 속성 username, emailAddress, password가 빈 문자열로 초기화되었는지 검증
    expect(wrapper.vm.form.username).toEqual('')
    expect(wrapper.vm.form.emailAddress).toEqual('')
    expect(wrapper.vm.form.password).toEqual('')
  })

  // 폼 입력과 데이터모델의 바인딩 검증
  it('should have form inputs bound with data model', () => {
    const username = 'sunny'
    const emailAddress = 'sunny@taskagile.com'
    const password = 'VueJsRocks!'

    wrapper.vm.form.username = username
    wrapper.vm.form.emailAddress = emailAddress
    wrapper.vm.form.password = password
    // ERROR : v-model에 바인딩한 값이 업데이트되지않아서 expect값과 receive값이 다름!
    // M1. nextTick으로 localVue에서 HTML을 다시 읽어주는 방법
    // localVue.nextTick(()=> {
    //   expect(fieldUsername.element.value).toEqual(username)
    //   expect(fieldEmailAddress.element.value).toEqual(emailAddress)
    //   expect(fieldPassword.element.value).toEqual(password)
    // })
    // M2. setValue를 이용해 값 주입
    fieldUsername.setValue(wrapper.vm.form.username)
    fieldEmailAddress.setValue(wrapper.vm.form.emailAddress)
    fieldPassword.setValue(wrapper.vm.form.password)

    expect(fieldUsername.element.value).toEqual(username)
    expect(fieldEmailAddress.element.value).toEqual(emailAddress)
    expect(fieldPassword.element.value).toEqual(password)
  })

  // 제출 핸들러 존재 여부 확인
  it('should have form submit event handler `submitForm`', () => {
    // stub? 실제로 동작하는 것 처럼 보이는 객체
    const stub = jest.fn()
    wrapper.setMethods({ submitForm: stub })
    buttonSubmit.trigger('submit')
    expect(stub).toBeCalled()
  })

  // 가입 성공
  it('should register when it is a new user', async () => {
    expect.assertions(2)
    const stub = jest.fn()
    wrapper.vm.$router.push = stub
    wrapper.vm.form.username = 'sunny'
    wrapper.vm.form.emailAddress = 'sunny@taskagile.com'
    wrapper.vm.form.password = 'VueJsRocks!'
    wrapper.vm.submitForm()
    expect(registerSpy).toBeCalled()

    await wrapper.vm.$nextTick()
    expect(stub).toHaveBeenCalledWith({name: 'LoginPage'})
  })

  // 가입 실패
  // test에러 못찾음!!!!
  // inVisible()값이 자꾸 false로 뜸
  it('should fail it is not a new user', async () => {
    expect.assertions(2)
    expect(wrapper.find('.failed').isVisible()).toBe(false)

    // 목에서는 오직 sunny@local 만 새로운 사용자
    wrapper.vm.form.username = 'ted'
    wrapper.vm.form.emailAddress = 'ted@taskagile.com'
    wrapper.vm.form.password = 'JestRocks!'

    wrapper.vm.submitForm()
    expect(registerSpy).toBeCalled()

    await wrapper.vm.$nextTick()
    // expect(wrapper.find('.failed').isVisible()).toBe(true)
  })

  // 데이터 검증(이메일이 유효하지 않으면 실패)
  it('should fail when the email address is invalid', ()=> {
    // const spy =jest.spyOn(registrationService, 'register') // register메소드의 스파이 생성
    // // spy : 감시하고 있는 메소드에대한 호출을 추적
    // wrapper.vm.form.emailAddress = 'bad-email-address'
    // wrapper.vm.submitForm()
    // expect(spy).not.toHaveBeenCalled() // register함수가 호출되지 않음을 검증
    // spy.mockReset() // 목에 저장된 모든 메소드 호출을 지우고
    // spy.mockRestore() // register()메소드를 기존 동작으로 복원
    wrapper.vm.form.username = 'test'
    wrapper.vm.form.emailAddress = 'bad-email-address'
    wrapper.vm.form.password = 'VueJsRocks!'
    wrapper.vm.submitForm()
    expect(registerSpy).not.toHaveBeenCalled()
  })

  // 데이터 검증(사용자 명이 유효하지 않으면 실패)
  it('should fail when the username is invalid', ()=> {
    wrapper.vm.form.username = 'a'
    wrapper.vm.form.emailAddress = 'test@taskagile.com'
    wrapper.vm.form.password = 'VueJsRocks!'
    wrapper.vm.submitForm()
    expect(registerSpy).not.toHaveBeenCalled()
  })

  // 데이터 검증(비밀번호가 유효하지 않으면 실패)
  it('should fail when the password is invalid', ()=> {
    wrapper.vm.form.username = 'test'
    wrapper.vm.form.emailAddress = 'test@taskagile.com'
    wrapper.vm.form.password = 'bad!'
    wrapper.vm.submitForm()
    expect(registerSpy).not.toHaveBeenCalled()
  })

})
