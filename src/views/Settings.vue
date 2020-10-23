<template>
  <div>
    <b-card no-body>
      <b-tabs card>
        <b-tab title="Общие" active>
          <b-card-text>Tab contents 1</b-card-text>
        </b-tab>
        <b-tab title="Клиенты">
          <b-card-text>
            <div class="form-group row">
              <label for="inputPassword" class="col-sm-9 col-form-label">
                Количество записей на странице по умолчанию:
              </label>
              <div class="col-sm-3">
                <input type="number" class="form-control" id="inputPassword">
              </div>
            </div>
            <div class="form-group row">
              <label for="inputPassword" class="col-sm-10 col-form-label">
                Количество записей на странице по умолчанию:
              </label>
              <div class="col-sm-2">
                <input type="number" class="form-control" id="inputPassword">
              </div>
            </div>
          </b-card-text>
        </b-tab>
        <b-tab title="Товары">
          <b-card-text>
            <div class="form-group row">
              <label for="inputPassword" class="col-sm-9 col-form-label">
                Количество записей на странице по умолчанию:
              </label>
              <div class="col-sm-3">
                <input type="number" class="form-control" id="inputPassword">
              </div>
            </div>
            <div class="form-group row">
              <label for="inputPassword" class="col-sm-10 col-form-label">
                Количество записей на странице по умолчанию:
              </label>
              <div class="col-sm-2">
                <input type="number" class="form-control" id="inputPassword">
              </div>
            </div>
          </b-card-text>
        </b-tab>
        <b-tab title="Отзывы">
          <b-card-text>Tab contents 2</b-card-text>
        </b-tab>
      </b-tabs>
    </b-card>
    <button class="btn btn-primary mt-2">
      Сохранить
    </button>
  </div>
</template>

<script>
import { TabsPlugin, CardPlugin } from 'bootstrap-vue'
import Vue from 'vue'

Vue.use(TabsPlugin);
Vue.use(CardPlugin);

export default {

}
</script>
