<template>
  <div class="list-group list-group-root card">
    <CategoryNode v-for="categoryNode in tree"
      :key="categoryNode.hash"
      :category="categoryNode"
      :level="0"
      :mainElement="$parent"/>
  </div>
</template>

<script>
import CategoryNode from './CategoryNode'

export default {
  components: {
    CategoryNode
  },
  props: {
    tree: Array
  }
}
</script>

<style>
.list-group.list-group-root {
  padding: 0;
  overflow: hidden;
}

.list-group.list-group-root .list-group {
  margin-bottom: 0;
}

.list-group.list-group-root .list-group-item {
  border-radius: 0;
  border-width: 1px 0 0 0;
}

.list-group.list-group-root > div:first-child > .list-group-item {
  border-width: 0;
}

.list-group.list-group-root > .list-group-item:first-child {
  border-top-width: 0;
}

.list-group.list-group-root > .list-group > .list-group-item {
  padding-left: 30px;
}

.list-group.list-group-root > .list-group > .list-group > .list-group-item {
  padding-left: 45px;
}
</style>
