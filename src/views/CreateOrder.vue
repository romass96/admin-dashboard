<template>
  <div class="card shadow mb-4 border-left-primary">
    <div class="card-header py-3">
      <h6 class="m-0 font-weight-bold text-primary">Новый заказ</h6>
    </div>
    <div class="card-body">
      <form @submit.prevent="createOrder">
        <div class="row">
          <div class="form-group col-md-6">
            <label for="lastName">Фамилия</label>
            <input type="text" class="form-control" id="lastName" placeholder="Введите фамилию" v-model.trim="lastName">
            <small class="form-text text-danger" v-if="$v.lastName.$dirty && !$v.lastName.required">
              Поле "фамилия" не должно быть пустым
            </small>
          </div>
          <div class="form-group col-md-6">
            <label for="firstName">Имя</label>
            <input type="text" class="form-control" id="firstName" placeholder="Введите имя" v-model.trim="firstName">
            <small class="form-text text-danger" v-if="$v.firstName.$dirty && !$v.firstName.required">
              Поле "имя" не должно быть пустым
            </small>
          </div>
          <div class="form-group col-md-6">
            <label for="phoneNumber">Номер телефона</label>
            <input type="text" class="form-control" id="phoneNumber" placeholder="+3809********" v-model.trim="phoneNumber">
            <small class="form-text text-danger" v-if="$v.phoneNumber.$dirty && !$v.phoneNumber.required">
              Поле "телефон" не должно быть пустым
            </small>
          </div>
          <div class="form-group col-md-6">
            <label for="email">Email</label>
            <input type="email" class="form-control" id="email" placeholder="*******@gmail.com" v-model.trim="email">
            <small class="form-text text-danger" v-if="$v.email.$dirty && !$v.email.required">
              Поле "email" не должно быть пустым
            </small>
            <small class="form-text text-danger" v-if="$v.email.$dirty && !$v.email.email">
              Некоректный email
            </small>
          </div>
        </div>
        <div class="dropdown-divider"></div>

        <h4 class="mb-2 font-weight-bold text-primary">
          Товары
          <button type="button"
            class="btn btn-circle btn-primary btn-sm"
            @click="addOrderItem"
            v-b-tooltip.hover title="Добавить товар">
            <i class="fas fa-plus"></i>
          </button>
        </h4>
        <b-table hover bordered
          :items="orderItems"
          :fields="fields"
          show-empty emptyText="Пока нет товаров. Добавьте новые товары">

          <template #cell(product)="data">
            <select class="form-control" v-model="data.item.product" @change="itemChanged(data.index)">
              <option v-for="product in products" :value="product" :key="product.id">
                {{ product.name }}
              </option>
            </select>
          </template>

          <template #cell(quantity)="data">
            <input class="form-control" type="number" v-model="data.item.quantity" @change="itemChanged(data.index)">
          </template>

          <template #cell(delete)="data">
            <button class="btn btn-danger btn-sm m-1" v-b-tooltip.hover title="Удалить" @click="deleteItem(data.index)">
              <i class="fas fa-trash"></i>
            </button>
          </template>

        </b-table>

        <h4>Общая цена заказа: {{ totalOrderPrice }} грн</h4>

        <div class="dropdown-divider"></div>

        <router-link to="/orders" class="btn btn-secondary btn-icon-split">
          <span class="icon text-white-50" >
            <i class="fas fa-arrow-left"></i>
          </span>
          <span class="text">Назад к заказам</span>
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
import { email, required, maxLength } from 'vuelidate/lib/validators'

export default {
  data: () => ({
    firstName: null,
    lastName: null,
    phoneNumber: null,
    email: null,
    comment: null,
    products: [],
    orderItems: [],
    fields: [
      {
        key: 'product',
        label: "Товар",
        thStyle: {
          width: '50%'
        }
      },
      {
        key: 'quantity',
        label: "Количество",
        thStyle: {
          width: '10%'
        }
      },
      {
        key: 'price',
        label: "Цена"
      },
      {
        label: '',
        key: 'delete',
        thStyle: {
          width: '5%'
        }
      }
    ]
  }),
  validations: {
      firstName: {
        required
      },
      lastName: {
        required
      },
      phoneNumber: {
        required
      },
      email: {
        email,
        required
      },
      comment: {
        maxLength: maxLength(255)
      }
  },
  computed: {
    ...mapGetters(['allProducts']),
    totalOrderPrice() {
      return this.orderItems.reduce((accumulator, currentItem) => accumulator + currentItem.price, 0);
    }
  },
  async mounted() {
    await this.$store.dispatch('fetchAllProducts');
    this.products = [...this.allProducts];
  },
  methods: {
    createOrder() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      if (!this.isOrderValid()) {
        return;
      }
      const order = {
        comment: this.comment,
        phoneNumber: this.phoneNumber,
        client: {
          firstName: this.firstName,
          lastName: this.lastName,
          phoneNumber: this.phoneNumber,
          email: this.email
        },
        orderItems: this.orderItems
      };
      this.$store.dispatch('createOrder', order).then(() => {
        this.$router.push('/orders');
      });
    },
    addOrderItem() {
      this.orderItems.push({
        product: null,
        quantity: 1,
        price: 0
      });
    },
    deleteItem(index) {
      this.orderItems.splice(index, 1);
    },
    itemChanged(index) {
      const orderItem = this.orderItems[index];
      orderItem.price = orderItem.quantity * orderItem.product.price;
    },
    isOrderValid() {
      if (this.orderItems.length === 0) {
          this.$swal({
            title: "Ошибка",
            text: "Заказ не содержит ни одного товара!",
            icon: "error"
          });
          return false;
      }
      return true;
    }
  }
}
</script>
