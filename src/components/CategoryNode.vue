<template>
  <div>
    <div class="list-group-item d-flex justify-content-between align-items-center">
      <a :href="'#category' + category.id" data-toggle="collapse" @click="closed = !closed">
        <span :style="{ marginLeft: (level * 15) + 'px', visibility: (category.children.length ? 'visible': 'hidden')}" class="mr-3">
          <FontAwesomeIcon :icon="['fas','angle-right']" v-if="closed"/>
          <FontAwesomeIcon :icon="['fas','angle-down']" v-else />
        </span>
        <span>
          <i class="fas fa-fw fa-folder"></i>
          {{category.name}}
        </span>
      </a>
      <span id="action-bar">
        <router-link
          tag="button"
          class="btn btn-circle btn-dark btn-sm m-1"
          v-b-tooltip.hover title="Добавить подкатегорию"
          :to="{ name: 'create-category', query: {parentCategoryId: category.id}}">
          <i class="fas fa-plus"></i>
        </router-link>
        <router-link
          tag="button"
          class="btn btn-circle btn-dark btn-sm m-1"
          v-b-tooltip.hover title="Просмотр"
          :to="{ name: 'view-category', query: {categoryId: category.id}}">
          <i class="fas fa-info"></i>
        </router-link>
        <router-link
          tag="button"
          class="btn btn-circle btn-dark btn-sm m-1"
          v-b-tooltip.hover title="Изменить"
          :to="{ name: 'edit-category', query: {categoryId: category.id}}">
          <i class="fas fa-pencil-alt"></i>
        </router-link>
        <button class="btn btn-circle btn-danger btn-sm m-1" v-b-tooltip.hover title="Удалить" @click="mainElement.showModalForDelete(category.id)">
          <i class="fas fa-trash"></i>
        </button>
      </span>
    </div>
    <div class="list-group collapse" v-if="category.children" :id="'category' + category.id">
      <CategoryNode v-for="childCategory in category.children"
        :category="childCategory"
        :key="childCategory.hash"
        :level="level + 1"
        :mainElement="mainElement"/>
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

export default {
  name: 'CategoryNode',
  props: {
    category: Object,
    level: Number,
    mainElement: Object
  },
  data: () => ({
    closed: true
  }),
  components: {
    FontAwesomeIcon
  }
}
</script>

<style>
.list-group-item a {
  color: #858796;
}

.list-group-item .fa-folder {
  color: #ebca27;
}

.list-group-item a:hover {
  text-decoration: none;
}
</style>
