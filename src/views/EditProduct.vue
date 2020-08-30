<template>
  <div class="card shadow mb-4 border-left-primary">
    <div class="card-header py-3">
      <h6 class="m-0 font-weight-bold text-primary">Изменение товара</h6>
    </div>
    <div class="card-body">
      <form @submit.prevent="updateProduct">
        <div class="form-group">
          <label for="productName">Название</label>
          <input type="text" class="form-control" id="productName" placeholder="Какой-то товар" v-model.trim="productName">
          <small class="form-text text-danger" v-if="$v.productName.$dirty && !$v.productName.required">
            Название не должно быть пустым
          </small>
        </div>
        <div class="form-group">
          <label for="productCategory">Категория</label>
          <select class="form-control" id="productCategory" v-model="productCategory" @change="categoryChanged($event.target.value)">
            <option v-for="category in categories" :value="category.id" :key="category.id">
              {{ category.name }}
            </option>
          </select>
          <small class="form-text text-danger" v-if="$v.productCategory.$dirty && !$v.productCategory.required">
            Категория не должна быть пустая
          </small>
        </div>
        <div class="form-group">
          <label for="productPrice">Цена</label>
          <input type="number" class="form-control" id="productPrice" placeholder="100" step="0.01" v-model="productPrice">
          <small class="form-text text-danger" v-if="$v.productPrice.$dirty && !$v.productPrice.required">
            Цена не должна быть пустая
          </small>
          <small class="form-text text-danger" v-if="$v.productPrice.$dirty && !$v.productPrice.minValue">
            Цена должна быть больше {{$v.productPrice.$params.minValue.min}}
          </small>
        </div>
        <div class="form-group">
          <label for="productDescription">Описание товара</label>
          <textarea class="form-control" id="productDescription" rows="5" v-model.trim="productDescription"></textarea>
          <small class="form-text text-danger" v-if="$v.productDescription.$dirty && !$v.productDescription.required">
            Описание не должно быть пустым
          </small>
          <small class="form-text text-danger" v-if="$v.productDescription.$dirty && !$v.productDescription.maxLength">
            Описание не должно быть больше {{$v.productDescription.$params.maxLength.max}} символов
          </small>
        </div>
        <div class="dropdown-divider"></div>

        <h4 class="mb-2 font-weight-bold text-primary">
          Характеристики
          <button type="button"
            class="btn btn-circle btn-primary btn-sm"
            @click="addProperty"
            v-b-tooltip.hover title="Добавить характеристику">
            <i class="fas fa-plus"></i>
          </button>
        </h4>

        <p class="text-center" v-if="!properties.length">
          Пока нет характеристик. Добавьте новые характеристики
        </p>
        <div class="form-group row" v-else v-for="(property, index) in properties" :key="index">
          <div class="col-lg-5">
            <input type="text" class="form-control" placeholder="Название" v-model="property.definition.name" :disabled="property.fromCategory">
          </div>
          <div class="col-lg-5">
            <input type="text" class="form-control" placeholder="Значение" v-model="property.value">
          </div>
          <div class="col-lg-2">
            <button class="btn btn-danger btn-icon-split" @click="deleteProperty(index)">
              <span class="icon text-white-50" >
                <i class="fas fa-trash"></i>
              </span>
              <span class="text">Удалить</span>
            </button>
          </div>
        </div>

        <div class="dropdown-divider"></div>

        <router-link to="/products" class="btn btn-secondary btn-icon-split">
          <span class="icon text-white-50" >
            <i class="fas fa-arrow-left"></i>
          </span>
          <span class="text">Назад к товарам</span>
        </router-link>
        <button type="submit" class="btn btn-primary btn-icon-split ml-1">
          <span class="icon text-white-50" >
            <i class="fas fa-file"></i>
          </span>
          <span class="text">Изменить</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { required, minValue, maxLength } from 'vuelidate/lib/validators'

export default {
  data: () => ({
    categories: [],
    productName: '',
    productPrice: 0,
    productDescription: '',
    productCategory: null,
    properties: []
  }),
  validations: {
      productName: {
        required
      },
      productPrice: {
        required,
        minValue: minValue(1)
      },
      productDescription: {
        required,
        maxLength: maxLength(255)
      },
      productCategory: {
        required
      }
  },
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
    if (productId) {
      await this.$store.dispatch('fetchProductsIfTheyAreNotLoaded');
      const product = this.findProductById(productId);
      this.productName = product.name;
      this.productPrice = product.price;
      this.productDescription = product.description;
      this.productCategory = product.category.id;
    }
  },
  methods: {
    updateProduct() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      const category = this.findCategoryById(this.productCategory);
      const product = {
        name: this.productName,
        description: this.productDescription,
        price: this.productPrice,
        quantity: 0,
        category,
        properties: this.properties
      };
      this.$store.dispatch('addProduct', product).then(() => {
        this.$router.push('/products');
      });
    },
    addProperty() {
      this.properties.push({
        definition: {
          name: ''
        },
        value: ''
      });
    },
    deleteProperty(index) {
      this.properties.splice(index, 1);
    },
    categoryChanged(categoryId) {
      const props = [...this.properties];
      for (let i = props.length - 1; i >= 0; i--) {
        if (props[i].fromCategory) {
          props.splice(i, 1);
        }
      }
      const propsFromCategory = this.findCategoryById(categoryId).definitions.map(definition => {
        return {
          definition,
          value: '',
          fromCategory: true
        };
      });
      this.properties = props.concat(propsFromCategory);
    }
  }
}
</script>
