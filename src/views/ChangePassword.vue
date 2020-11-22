<template>
  <div class="row">
    <div class="col-lg-6 d-none d-lg-block">
      <img class="img-fluid px-3 px-sm-4 mt-3 mb-4" src="@/assets/img/change_password.svg" alt="">
    </div>
    <div class="col-lg-6">
      <div class="p-5">
        <div class="text-center">
          <h1 class="h4 text-gray-900 mb-2">Сброс пароля</h1>
          <p class="mb-4">
            Введите свой новый пароль для восстановления доступа к аккаунту
          </p>
        </div>
        <form class="user" @submit.prevent="changePassword">
          <div class="form-group">
            <input
              type="password"
              class="form-control form-control-user"
              id="email"
              placeholder="Ваш новый пароль"
              v-model.trim="password"
            />
          </div>
          <button type="submit" class="btn btn-dark btn-user btn-block">
            Изменить пароль
          </button>
        </form>
        <hr />
        <div class="text-center">
          <router-link to="/login" class="small"> Войти </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";

export default {
  data: () => ({
    password: null,
    token: null
  }),
  validations: {
    password: { required },
  },
  created() {
    this.token = this.$route.query.token;
  },
  methods: {
    changePassword() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      const data = {
        token: this.token,
        password: this.password
      }
      
      this.$store
        .dispatch("changePassword", data)
        .then(() => {
          return this.$swal({
            title: "Congratulations",
            text: "Пароль был успешно изменен",
            icon: "success"
          });
        })
        .then(() => {
          this.$router.push("/login");
        })
        .catch((error) => {
          let message = "Что-то пошло не так";
          if (error.response.status === 400) {
            message = "Время для сброса пароля истекло."
          } else if (error.response.status === 404) {
            message = "Токен не найден"
          }
          this.$swal({
              title: "Ошибка",
              text: message,
              icon: "error"
          });
  
        });
    }
  },
};
</script>
