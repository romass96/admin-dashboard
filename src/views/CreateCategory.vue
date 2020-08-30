<template>
  <div class="card shadow mb-4 border-left-primary">
    <div class="card-header py-3">
      <h6 class="m-0 font-weight-bold text-primary">
        Создание категории
      </h6>
    </div>
    <div class="card-body">
      <form @submit.prevent="createCategory">
        <div class="form-group">
          <label for="categoryName">Название</label>
          <input type="text" class="form-control" id="categoryName" placeholder="Какая-то категория" v-model.trim="categoryName">
          <small class="form-text text-danger" v-if="$v.categoryName.$dirty && !$v.categoryName.required">
            Название не должно быть пустым
          </small>
        </div>
        <div class="form-group">
          <label for="parentCategoryId">Родительская категория</label>
          <select class="form-control" id="parentCategoryId" v-model="parentCategoryId">
            <option v-for="category in categories" :value="category.id" :key="category.id">
              {{ category.name }}
            </option>
          </select>
        </div>
        <div class="dropdown-divider"></div>

        <h4 class="mb-2 font-weight-bold text-primary">
          Характеристики
          <button
            class="btn btn-circle btn-primary btn-sm"
            type="button"
            @click="addDefinition"
            v-b-tooltip.hover title="Добавить характеристику">
            <i class="fas fa-plus"></i>
          </button>
        </h4>

        <p class="text-center" v-if="!definitions.length">
          Пока нет характеристик. Добавьте новые характеристики
        </p>

        <div class="form-group row" v-else v-for="(definition, index) in $v.definitions.$each.$iter" :key="index">
          <div class="col-lg-5">
            <input type="text" class="form-control" placeholder="Название" v-model="definition.name.$model">
            <small class="form-text text-danger" v-if="definition.name.$dirty && !definition.name.required">
              Название не должно быть пустым
            </small>
            <small class="form-text text-danger" v-if="definition.name.$dirty && !definition.name.minLength">
              Название должно состоять минимум из {{ definition.name.$params.minLength.min }} символов
            </small>
          </div>
          <div class="col-lg-2">
            <button class="btn btn-danger btn-icon-split" @click="deleteDefinition(index)">
              <span class="icon text-white-50" >
                <i class="fas fa-trash"></i>
              </span>
              <span class="text">Удалить</span>
            </button>
          </div>
        </div>

        <div class="dropdown-divider"></div>

        <router-link to="/categories" class="btn btn-secondary btn-icon-split">
          <span class="icon text-white-50" >
            <i class="fas fa-arrow-left"></i>
          </span>
          <span class="text">Назад к категориям</span>
        </router-link>
        <button type="submit" class="btn btn-primary btn-icon-split ml-1">
          <span class="icon text-white-50" >
            <i class="fas fa-file"></i>
          </span>
          <span class="text">Создать</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { required, minLength } from 'vuelidate/lib/validators'

export default {
  data: () => ({
    categoryName: '',
    definitions: [],
    parentCategoryId: 0,
    categories: []
  }),
  validations: {
      categoryName: {
        required
      },
      definitions: {
        $each: {
          name: {
            required,
            minLength: minLength(3)
          }
        }
      }
  },
  computed: {
    ...mapGetters([
      'findCategoryById',
      'categoriesWithEmptyOption'])
  },
  mounted: async function() {
    this.parentCategoryId = this.$route.query.parentCategoryId || 0;
    await this.$store.dispatch('fetchCategoriesIfTheyAreNotLoaded');
    this.categories = this.categoriesWithEmptyOption;
  },
  methods: {
    createCategory() {
        if (this.$v.$invalid) {
          this.$v.$touch()
          return
        }
        const category = {
          name: this.categoryName,
          definitions: this.definitions
        };
        if (this.parentCategoryId) {
          category.parentCategory = this.findCategoryById(this.parentCategoryId);
        }
        this.$store.dispatch('addCategory', category).then(() => {
          this.$router.push('/categories');
        });
    },
    addDefinition() {
      this.definitions.push({ name: ''});
    },
    deleteDefinition(index) {
      this.definitions.splice(index, 1);
    }
  }
}
</script>
