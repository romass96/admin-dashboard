<template>
  <div class="card shadow mb-4 border-left-primary">
    <div class="card-header py-3">
      <h6 class="m-0 font-weight-bold text-primary">Новая рассылка</h6>
    </div>
    <div class="card-body">
      <form @submit.prevent="createNewsletter">
        <div class="row">
          <div class="form-group col-md-6">
            <label for="subject">Тема рассылки</label>
            <input
              type="text"
              class="form-control"
              id="subject"
              placeholder="Введите тему рассылки"
              v-model.trim="subject"
            />
            <small
              class="form-text text-danger"
              v-if="$v.subject.$dirty && !$v.subject.required"
            >
              Поле "Тема рассылки" не должно быть пустым
            </small>
          </div>
          <div class="form-group col-md-3">
            <label for="newsletter-date">Дата отправки</label>
            <b-form-datepicker
              id="newsletter-date"
              v-model="newsletterDate"
              class="mb-2"
              placeholder="Выберите дату"
              :date-format-options="{
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              }"
            />
            <small
              class="form-text text-danger"
              v-if="$v.newsletterDate.$dirty && !$v.newsletterDate.required"
            >
              Введите валидную дату
            </small>
          </div>
          <div class="form-group col-md-3">
            <label for="newsletter-time">Время отправки</label>
            <b-form-timepicker
              id="newsletter-time"
              v-model="newsletterTime"
              :hour12="false"
              class="mb-2"
              placeholder="Выберите время"
            />
            <small
              class="form-text text-danger"
              v-if="$v.newsletterTime.$dirty && !$v.newsletterTime.required"
            >
              Введите валидное время
            </small>
          </div>
          <div class="form-group col-md-12">
            <label for="html-content">Контент</label>
            <textarea
              class="form-control"
              id="html-content"
              rows="10"
              v-model.trim="htmlContent"
            ></textarea>
            <small
              class="form-text text-danger"
              v-if="$v.htmlContent.$dirty && !$v.htmlContent.required"
            >
              Контент не должен быть пустым
            </small>
          </div>
        </div>

        <div class="dropdown-divider"></div>

        <router-link to="/newsletters" class="btn btn-secondary btn-icon-split">
          <span class="icon text-white-50">
            <i class="fas fa-arrow-left"></i>
          </span>
          <span class="text">Назад к рассылкам</span>
        </router-link>
        <button type="submit" class="btn btn-primary btn-icon-split ml-1">
          <span class="icon text-white-50">
            <i class="fas fa-file"></i>
          </span>
          <span class="text">Создать</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import moment from "moment";

const API_DATE_FORMAT = "DD-MM-YYYY HH:mm";
const DATE_FORMAT = "YYYY-MM-DD";
const TIME_FORMAT = "HH:mm:ss";
const DATE_TIME_FORMAT = "YYYY-MM-DD HH:mm:ss";

const validDate = (value) => moment(value, DATE_FORMAT)._isValid;
const validTime = (value) => moment(value, TIME_FORMAT)._isValid;

export default {
  data: () => ({
    subject: null,
    newsletterDate: null,
    newsletterTime: null,
    htmlContent: null,
  }),
  validations: {
    htmlContent: {
      required,
    },
    subject: {
      required,
    },
    newsletterDate: {
      validDate,
    },
    newsletterTime: {
      validTime,
    },
  },
  methods: {
    createNewsletter() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      const newsletter = {
        subject: this.subject,
        htmlContent: this.htmlContent,
      };

      const newsletterDateTime =
        this.newsletterDate + " " + this.newsletterTime;
      const momentDateTime = moment(newsletterDateTime, DATE_TIME_FORMAT);
      if (momentDateTime._isValid) {
        newsletter.dispatchDate = momentDateTime.format(API_DATE_FORMAT);
      }

      this.$store.dispatch("createNewsletter", newsletter).then(() => {
        this.$router.push("/newsletters");
      });
    },
  },
};
</script>
