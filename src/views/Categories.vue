<template>
  <div>
    <div class="d-sm-flex align-items-center justify-content-between mb-4">
      <h1 class="h3 mb-0 text-gray-800">Категории</h1>
    </div>
    <CategoryTree :tree="tree"/>


    <router-link class="btn btn-dark btn-circle btn-lg"
        v-b-tooltip.hover title="Добавить категорию"
        id="add-category-btn"
        tag="button"
        to="/createCategory">
      <i class="fas fa-plus"></i>
    </router-link>

    <b-modal ref="delete-category-modal" :static="true">
      <template v-slot:modal-title>
        Удаление категории
      </template>
      <div class="d-block text-center">
        Вы действительно хотите удалить эту категорию и все её подкатегории ?
      </div>
      <template v-slot:modal-footer>
        <button class="btn btn-secondary float-left" @click="$refs['delete-category-modal'].hide()">Нет</button>
        <button class="btn btn-danger float-right" @click="deleteCategory">Да</button>
      </template>
    </b-modal>

  </div>
</template>

<script>
import CategoryTree from '@/components/CategoryTree'
import { BModal, VBModal } from 'bootstrap-vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    CategoryTree,
    'b-modal': BModal,
  },
  directives: {
    'b-modal': VBModal
  },
  data: () => ({
    tree: []
  }),
  mounted : async function() {
    await this.$store.dispatch('fetchCategoriesIfTheyAreNotLoaded');
    this.tree = this.categoriesTree;
  },
  computed: {
    ...mapGetters(['categoriesTree'])
  },
  methods: {
    showModalForDelete(categoryId) {
      const modal = this.$refs['delete-category-modal'];
      modal.categoryId = categoryId;
      modal.show();
    },
    deleteCategory() {
      const component = this;
      const modal = this.$refs['delete-category-modal'];
      component.$store.dispatch('deleteCategory', modal.categoryId).then(function() {
        component.tree = component.categoriesTree;
        modal.hide();
      });
    }
  }
}
</script>

<style scoped>
#add-category-btn {
  position: fixed;
  bottom: 50px;
  right: 50px;
}
</style>
