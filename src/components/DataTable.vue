<template>
  <div>
    <div class="mb-2 d-flex justify-content-between">
      <div class="d-inline-block">
        <span>Показывать </span>
        <select class="form-control" id="perPageSelect" @change="changePerPage($event.target.value)">
          <option v-for="p in perPageOptions" :key="p" :value="p">{{ p }}</option>
        </select>
        <span> записей</span>
      </div>
      <div class="d-inline-block">
        <div class="input-group flex-nowrap">
          <div class="input-group-prepend">
            <span class="input-group-text">
              <i class="fas fa-search"></i>
            </span>
          </div>
          <input type="text" class="form-control" placeholder="Поиск" v-model="filter">
        </div>
      </div>
    </div>

    <b-table hover bordered id="dataTable"
      :items="items"
      :fields="fields"
      :filter="filter"
      :per-page="perPage"
      :current-page="currentPage">
      <template v-for="(index, name) in $scopedSlots" v-slot:[name]="data">
        <slot :name="name" v-bind="data"></slot>
      </template>
      <template v-slot:table-busy>
        <div class="text-center text-danger my-2">
          <b-spinner class="align-middle"></b-spinner>
          <strong>Загрузка...</strong>
        </div>
      </template>
    </b-table>

    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      aria-controls="dataTable">
    </b-pagination>
  </div>
</template>

<script>

export default {
  props: {
    items: Array,
    fields: Array,
    busy: Boolean
  },
  data: () => ({
    perPageOptions: [
      5, 10, 15, 20, 25, 50
    ],
    perPage: 5,
    currentPage: 1,
    filter: null
  }),
  methods: {
    changePerPage(perPage) {
      this.perPage = perPage;
    }
  },
  computed: {
    rows() {
      return this.items.length;
    }
  }
}
</script>

<style scoped>
#perPageSelect {
  width: 70px;
  display: inline-block;
}

.form-control:focus {
  box-shadow: none;
}
</style>
