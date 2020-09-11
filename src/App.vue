<template>
<div id="app">
  <component :is="layout">
    <router-view />
  </component>
</div>
</template>

<script>
import AuthLayout from '@/layouts/AuthLayout'
import MainLayout from '@/layouts/MainLayout'
import EmptyLayout from '@/layouts/EmptyLayout'

export default {
  computed: {
    layout() {
      return (this.$route.meta.layout || 'auth') + '-layout';
    }
  },
  components: {
    'auth-layout': AuthLayout,
    'main-layout' : MainLayout,
    'empty-layout' : EmptyLayout
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i');
</style>
