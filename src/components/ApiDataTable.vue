<template>
  <div>
    <div class="mb-2 d-flex justify-content-between">
      <div class="d-inline-block">
        <span>Показывать </span>
        <select class="form-control" id="perPageSelect" v-model="perPage">
          <option v-for="p in perPageOptions" :key="p" :value="p">{{ p }}</option>
        </select>
        <span> записей</span>
      </div>
      <div class="d-inline-block" style="position: relative">
        <span class="delete-search-text" v-show="isFilterPresent" @click="resetFilter">
          <i class="fas fa-times"></i>
        </span>
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

    <b-table hover bordered id="dataTable" ref="dataTable" show-empty
      :empty-text="'Нет данных по вашему запросу'"
      :items="advancedItemsProvider"
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
    fields: Array,
    itemsProvider: Function
  },
  data: () => ({
    perPageOptions: [
      5, 10, 15, 20, 25, 50
    ],
    perPage: 10,
    currentPage: 1,
    filter: null,
    rows: 0
  }),
  methods: {
    async advancedItemsProvider(ctx) {
      const result = await this.itemsProvider(ctx);
      this.rows = result.totalItems;
      return result.items;
    },
    refresh() {
      this.$refs.dataTable.refresh();
    },
    resetFilter() {
      this.filter = null;
    }
  },
  computed: {
    isFilterPresent() {
      return this.filter && this.filter.length;
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

.delete-search-text {
  position: absolute;
  right: 7px;
  top: 7px;
  cursor: pointer;
  z-index: 1000;
}
</style>
