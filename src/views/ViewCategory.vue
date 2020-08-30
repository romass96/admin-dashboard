<template>
  <div class="card shadow mb-4 border-left-primary">
    <div class="card-header py-3">
      <h6 class="m-0 font-weight-bold text-primary">
        Просмотр категории
      </h6>
    </div>
    <div class="card-body">
      <form>
        <div class="form-group">
          <label for="categoryName">Название</label>
          <input type="text" class="form-control" id="categoryName" placeholder="Какая-то категория" v-model.trim="categoryName" disabled>
        </div>
        <div class="form-group">
          <label for="parentCategoryId">Родительская категория</label>
          <select class="form-control" id="parentCategoryId" v-model="parentCategory.id" disabled>
            <option :value="parentCategory.id" :key="parentCategory.id">
              {{ parentCategory.name }}
            </option>
          </select>
        </div>
        <div class="dropdown-divider"></div>

        <h4 class="mb-2 font-weight-bold text-primary">
          Характеристики
        </h4>

        <div class="form-group row" v-for="(definition, index) in definitions" :key="index">
          <div class="col-lg-5">
            <input type="text" class="form-control" placeholder="Название" v-model="definition.name" disabled>
          </div>
        </div>

        <div class="dropdown-divider"></div>

        <router-link to="/categories" class="btn btn-secondary btn-icon-split">
          <span class="icon text-white-50" >
            <i class="fas fa-arrow-left"></i>
          </span>
          <span class="text">Назад к категориям</span>
        </router-link>
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data: () => ({
    categoryId: null,
    categoryName: '',
    parentCategory: {},
    definitions: []
  }),
  computed: {
    ...mapGetters([
      'findCategoryById'])
  },
  mounted: async function() {
    this.categoryId = this.$route.query.categoryId;
    await this.$store.dispatch('fetchCategoriesIfTheyAreNotLoaded');
    const category = this.findCategoryById(this.categoryId);
    this.categoryName = category.name;
    if (category.parentCategory) {
      this.parentCategory = category.parentCategory;
    } else {
      this.parentCategory = {
        id: 0,
        name: 'Нет категории'
      }
    }

    this.definitions = category.definitions;
  }
}
</script>
