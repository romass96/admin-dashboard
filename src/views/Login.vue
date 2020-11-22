<template>
<div class="row">
  <div class="col-lg-6 d-none d-lg-block">
    <img class="img-fluid px-3 px-sm-4 mt-3 mb-4" src="@/assets/img/login.svg" alt="">
  </div>
  <div class="col-lg-6">
    <div class="p-5">
      <div class="text-center">
        <h1 class="h4 text-gray-900 mb-4">Добро пожаловать!</h1>
      </div>
      <form class="user" @submit.prevent="login" ref="loginForm">
        <div class="form-group">
          <input
            type="email"
            class="form-control form-control-user"
            id="email"
            placeholder="Почта"
            v-model.trim="email">
          <small class="form-text text-danger" v-if="$v.email.$dirty && !$v.email.required">Введите почту</small>
          <small class="form-text text-danger" v-if="$v.email.$dirty && !$v.email.email">Введите коректный адрес почты</small>
        </div>
        <div class="form-group">
          <input
            type="password"
            class="form-control form-control-user"
            id="password"
            placeholder="Пароль"
            v-model.trim="password">
          <small class="form-text text-danger" v-if="$v.password.$dirty && !$v.password.required">Введите пароль</small>
          <small class="form-text text-danger" v-if="$v.password.$dirty && !$v.password.minLength">
            Пароль должен состоять минимум из {{$v.password.$params.minLength.min}} символов
          </small>
        </div>
        <div class="form-group">
          <div class="custom-control custom-checkbox small">
            <input type="checkbox" class="custom-control-input" id="rememberMe" v-model="rememberMe">
            <label class="custom-control-label" for="rememberMe" >Запомнить меня</label>
          </div>
        </div>
        <button type="submit" class="btn btn-dark btn-user btn-block">
          Войти
        </button>
      </form>
      <hr>
      <div class="text-center">
        <router-link to="/forgotPassword" class="small">
          Забыл пароль?
        </router-link>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { email, required, minLength } from 'vuelidate/lib/validators'

export default {
  data: () => ({
    email: '',
    password: '',
    rememberMe: false
  }),
  validations: {
    email: { email, required },
    password: { required, minLength: minLength(6) }
  },
  methods: {
    login() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      const formData = {
        email: this.email,
        password: this.password,
        rememberMe: this.rememberMe
      }
      this.$store.dispatch('login', formData).then(() => {
        this.$router.push('/dashboard');
      }).catch(() => {
        this.$swal({
            title: "Ошибка",
            text: "Неправильная почта или пароль",
            icon: "error"
          }).then(() => this.$refs.loginForm.reset());
      })
    }
  }
}
</script>
