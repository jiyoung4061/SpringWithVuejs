import moxios from 'moxios'
import registrationService from '@/service/registration'

describe('service/registration', ()=>{
  beforeEach(() => {
    // 목 : test를 하기위해 만든 가짜 객체
    moxios.install()
  })

  afterEach(() => {
    moxios.uninstall()
  })

  it('should pass the response to caller when request succeeded', ()=>{
    expect.assertions(2)
    // 목 요청이 만들어질 때까지 기다린다.
    moxios.wait(()=>{
      let request = moxios.requests.mostRecent() // 가장 최근 요청을 가져오고
      expect(request).toBeTruthy() // 최근 요청이 존재했는지 검증
      request.respondWith({ // 요청에 대한 응답 지정
        status:200,
        response:{result:'success'}
      })
    })

    // register() 호출하고 그 결과로 반환된 값이 성공인지 확인
    return registrationService.register().then(data => {
      expect(data.result).toEqual('success')
    })
  })

  it('should propagate the error to caller when request failed', ()=> {
    expect.assertions(2)
    moxios.wait(()=>{
      let request = moxios.requests.mostRecent()
      expect(request).toBeTruthy()
      request.reject({
        status: 400,
        response: {message:'Bad Request'}
      })
    })
    return registrationService.register().catch(error => {
      expect(error.response.message).toEqual('Bad Request')
    })
  })

})
