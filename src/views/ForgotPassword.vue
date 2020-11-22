<template>
  <div class="row">
    <div class="col-lg-6 d-none d-lg-block">
      <img class="img-fluid px-3 px-sm-4 mt-3 mb-4" src="@/assets/img/forgot_password.svg" alt="">
    </div>
    <div class="col-lg-6">
      <div class="p-5">
        <div class="text-center">
          <h1 class="h4 text-gray-900 mb-2">Забыли пароль?</h1>
          <p class="mb-4">
            Бывает. Просто введи свой email и мы отправим ссылку для сброса
            пароля!
          </p>
        </div>
        <form class="user" @submit.prevent="resetPassword">
          <div class="form-group">
            <input
              type="email"
              class="form-control form-control-user"
              id="email"
              placeholder="Ваш email"
              v-model.trim="email"
            />
          </div>
          <button type="submit" class="btn btn-dark btn-user btn-block">
            Сбросить пароль
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
import { email, required } from "vuelidate/lib/validators";

export default {
  data: () => ({
    email: null,
  }),
  validations: {
    email: { email, required },
  },
  methods: {
    resetPassword() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      this.$store
        .dispatch("resetPassword", this.email)
        .then(() => {
          return this.$swal({
            title: "Congratulations",
            text: "Ссылка для сброса пароля успешно отправлена",
            icon: "success"
          });
        })
        .then(() => {
          this.$router.push("/login");
        })
        .catch((error) => {
          if (error.response.status === 404) {
            this.$swal({
              title: "Ошибка",
              text: "Пользователь с таким email не существует",
              icon: "error"
            });
          }
        });
    },
  },
};
</script>
