<template>
   <div class="container">
    <div class="row justify-content-center">
      <div class="register-form">
        <div class="logo-wrapper">
          <img class="logo" src="/static/images/logo.png">
          <div class="tagline">Open source task management tool</div>
        </div>
        <form @submit.prevent="submitForm">
          <div v-show="errorMessage" class="alert alert-danger failed">{{ errorMessage }}</div>
          <div class="form-group">
            <label for="username">Username</label>
            <input type="text" class="form-control" id="username" v-model="form.username">
          </div>
          <div class="form-group">
            <label for="emailAddress">emailAddress</label>
            <input type="text" class="form-control" id="emailAddress" v-model="form.emailAddress">
          </div>
          <div class="form-group">
            <label for="password">password</label>
            <input type="text" class="form-control" id="password" v-model="form.password">
          </div>
          <button type="submit" class="btn btn-primary btn-block">Create account</button>
          <p class="accept-terms text-muted">By clicking “Create account”, you agree to our <a href="#">terms of service</a> and <a href="#">privacy policy</a>.</p>
          <p class="text-center text-muted">Already have an account? <a href="/login">Sign in</a></p>
        </form>
      </div>
    </div>
    <footer class="footer">
      <span class="copyright">&copy; 2018 TaskAgile.com</span>
      <ul class="footer-links list-inline float-right">
        <li class="list-inline-item"><a href="#">About</a></li>
        <li class="list-inline-item"><a href="#">Terms of Service</a></li>
        <li class="list-inline-item"><a href="#">Privacy Policy</a></li>
        <li class="list-inline-item"><a href="https://github.com/taskagile/vuejs.spring-boot.mysql" target="_blank">GitHub</a></li>
      </ul>
    </footer>
  </div>
</template>

<script>
import registrationService from '@/service/registration'
import { required, email, minLength, maxLength, alphaNum } from 'vuelidate/lib/validators'

export default {
  name:'RegisterPage',
  data: function () {
    return {
      form: {
        username: '',
        emailAddress: '',
        password: ''
      },
      errorMessage: ''
    }
  },
  validations: { // 각 필드의 규칙 명시
    form: {
      username: {
        required,
        minLength: minLength(2),
        maxLength: maxLength(50),
        alphaNum
      },
      emailAddress: {
        required,
        email,
        maxLength: maxLength(100)
      },
      password: {
        required,
        minLength: minLength(6),
        maxLength: maxLength(30)
      }
    }
  },
  methods: {
    submitForm(){
      // TODO : 데이터 검증하기
      // this.$v : 검증에대한 현재 상태를 가짐
      this.$v.$touch() // 검증 시작
      if(this.$v.$invalid) { // 결과 확인, 검증 실패시 invalid값은 true 회원가입 프로세스 중단
        return
      }
      registrationService.register(this.form).then(() => {
        this.$router.push({name: 'LoginPage'})
      }).catch((error) => {
        this.errorMessage = 'Failed to register user. ' + error.message
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  max-width: 900px;
}
.register-form {
  max-width: 320px;
  margin-top: 50px;
}
.logo-wrapper {
  text-align: center;
  margin-bottom: 40px;
  .tagline {
    line-height: 180%;
    color: #666;
  }
 .logo {
    max-width: 150px;
    margin: 0 auto;
  }
}
.register-form {
  .form-group label {
    font-weight: bold;
    color: #555;
  }
  .accept-terms {
    margin: 20px 0 40px 0;
  }
}
.footer {
  width: 100%;
  font-size: 13px;
  color: #666;
  line-height: 40px;
  border-top: 1px solid #ddd;
  margin-top: 50px;
  .list-inline-item {
    margin-right: 10px;
  }
  a {
    color: #666;
  }
}

</style>
