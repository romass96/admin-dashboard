<template>
  <div class="card shadow mb-4 border-left-primary">
    <div class="card-header py-3">
      <h6 class="m-0 font-weight-bold text-primary">Просмотр товара</h6>
    </div>
    <div class="card-body">
      <form>
        <div class="form-group">
          <label for="productName">Название</label>
          <input type="text" class="form-control" id="productName" placeholder="Какой-то товар" v-model.trim="productName" disabled>
        </div>
        <div class="form-group">
          <label for="productCategory">Категория</label>
          <select class="form-control" id="productCategory" v-model="productCategory" disabled>
            <option v-for="category in categories" :value="category.id" :key="category.id">
              {{ category.name }}
            </option>
          </select>
        </div>
        <div class="form-group">
          <label for="productPrice">Цена</label>
          <input type="number" class="form-control" id="productPrice" placeholder="100" step="0.01" v-model="productPrice" disabled>
        </div>
        <div class="form-group">
          <label for="productDescription">Описание товара</label>
          <textarea class="form-control" id="productDescription" rows="5" v-model.trim="productDescription" disabled></textarea>
        </div>
        <div class="dropdown-divider"></div>

        <h4 class="mb-2 font-weight-bold text-primary">
          Характеристики
        </h4>

        <div class="form-group row" v-for="(property, index) in properties" :key="index">
          <div class="col-lg-5">
            <input type="text" class="form-control" placeholder="Название" v-model="property.definition.name" disabled>
          </div>
          <div class="col-lg-5">
            <input type="text" class="form-control" placeholder="Значение" v-model="property.value" disabled>
          </div>
        </div>

        <div class="dropdown-divider"></div>

        <router-link to="/products" class="btn btn-secondary btn-icon-split">
          <span class="icon text-white-50" >
            <i class="fas fa-arrow-left"></i>
          </span>
          <span class="text">Назад к товарам</span>
        </router-link>
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data: () => ({
    categories: [],
    productName: '',
    productPrice: 0,
    productDescription: '',
    productCategory: null,
    properties: []
  }),
  computed: {
    ...mapGetters([
      'allCategories',
      'areCategoriesLoaded',
      'findCategoryById',
      'areProductsLoaded',
      'findProductById'])
  },
  async mounted() {
    await this.$store.dispatch('fetchCategoriesIfTheyAreNotLoaded');
    this.categories = this.allCategories;
    const productId = this.$route.query.productId;
    await this.$store.dispatch('fetchProductsIfTheyAreNotLoaded');
    const product = this.findProductById(productId);
    this.productName = product.name + '-copy';
    this.productPrice = product.price;
    this.productDescription = product.description;
    this.productCategory = product.category.id;
    this.properties = product.properties;
  }
}
</script>
