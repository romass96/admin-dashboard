<template>
  <div class="card shadow mb-4 border-left-primary">
    <div class="card-header py-3">
      <h6 class="m-0 font-weight-bold text-primary">Просмотр товара</h6>
    </div>
    <div class="card-body">
      <div class="row">
        <div class="col-md-4">
          <label for="productName">Название</label>
        </div>
        <div class="col-md-8">
          <p id="productName">{{ productName }}</p>
        </div>
      </div>
      <div class="row">
        <div class="col-md-4">
          <label for="productCategoryName">Категория</label>
        </div>
        <div class="col-md-8">
          <p id="productCategoryName">{{ productCategoryName }}</p>
        </div>
      </div>
      <div class="row">
        <div class="col-md-4">
          <label for="productPrice">Цена</label>
        </div>
        <div class="col-md-8">
          <p id="productPrice">{{ productPrice }}</p>
        </div>
      </div>
      <div class="row">
        <div class="col-md-4">
          <label for="productDescription">Описание товара</label>
        </div>
        <div class="col-md-8">
          <p id="productDescription">{{ productDescription }}</p>
        </div>
      </div>

      <div class="dropdown-divider"></div>

      <h4 class="mb-2 font-weight-bold text-primary">Характеристики</h4>

      <div
        class="form-group row"
        v-for="(property, index) in properties"
        :key="index"
      >
        <div class="col-lg-5">
          <input
            type="text"
            class="form-control"
            placeholder="Название"
            v-model="property.definition.name"
            disabled
          />
        </div>
        <div class="col-lg-5">
          <input
            type="text"
            class="form-control"
            placeholder="Значение"
            v-model="property.value"
            disabled
          />
        </div>
      </div>

      <div class="dropdown-divider"></div>

      <router-link to="/products" class="btn btn-secondary btn-icon-split">
        <span class="icon text-white-50">
          <i class="fas fa-arrow-left"></i>
        </span>
        <span class="text">Назад к товарам</span>
      </router-link>
    </div>
  </div>
</template>

<script>

export default {
  data: () => ({
    productName: null,
    productPrice: 0,
    productDescription: null,
    productCategoryName: null,
    properties: [],
  }),
  async created() {
    const productId = this.$route.query.productId;
    const product = await this.$store.dispatch("fetchProductById", productId);
    this.productName = product.name;
    this.productPrice = product.price;
    this.productDescription = product.description;
    this.productCategoryName = product.category.name;
    this.properties = product.properties;
  },
};
</script>
