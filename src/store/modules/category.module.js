import axios from 'axios'
import hash from 'object-hash'

const apiUrl = process.env.VUE_APP_API_URL + "/api/categories";

export default {
  actions: {
    async fetchCategories(context) {
      const response = await axios.get(apiUrl);
      const categories = response.data;
      context.commit('updateCategories', categories);
      context.commit('setCategoriesLoaded');
      return categories;
    },
    async fetchCategoriesIfTheyAreNotLoaded(context) {
      if (!context.state.loaded) {
        await context.dispatch('fetchCategories');
      }
    },
    async addCategory(context, category) {
      const response = await axios.post(apiUrl, category);
      const categoryWithId = response.data;
      context.commit('addCategory', categoryWithId);
    },
    async deleteCategory(context, categoryId) {
      const url = `${apiUrl}/${categoryId}?returnAll=true`;
      const categories = await axios.delete(url);
      context.commit('updateCategories', categories);
    },
    async updateCategory(context, category) {
      const url = `${apiUrl}/${category.id}`;
      await axios.put(url, category);
      await context.dispatch('fetchCategories');
    }
  },
  mutations: {
    updateCategories(state, categories) {
      state.categories = categories;
    },
    addCategory(state, category) {
      state.categories.push(category);
    },
    setCategoriesLoaded(state) {
      state.loaded = true;
    }
  },
  state: {
    categories: [],
    loaded: false
  },
  getters: {
    allCategories(state) {
      return state.categories;
    },
    categoriesTree(state) {
      const categoryMap = {};
      state.categories.forEach(item => {
        const category = {...item};
        processCategory(category, categoryMap);
      });

      return Object.values(categoryMap).map(category => {
          category.hash = hash(category);
          return category;
        }).filter(category => !category.parentCategory);
    },
    findCategoryById: state => id => state.categories.find(category => category.id == id),
    areCategoriesLoaded(state) {
      return state.loaded;
    },
    categoriesWithEmptyOption(state) {
      const categories = [...state.categories];
      categories.push({
        id: 0,
        name: "Нет категории"
      });
      return categories;
    }
  }
}

function processCategory(category, categoryMap) {
    category.children = [];
    const parent = category.parentCategory;
    if (parent) {
      processCategory(parent, categoryMap);
    }
    if (!categoryMap[category.id]) {
        categoryMap[category.id] = category;
        if (parent) {
          categoryMap[parent.id].children.push(category);
        }
    }
}
