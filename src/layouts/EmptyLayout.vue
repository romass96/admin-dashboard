<template>

<div id="wrapper">
  <div id="content-wrapper" class="d-flex flex-column">
    <div id="content">
      <div class="container-fluid">
        <router-view />
      </div>
    </div>

    <Footer/>

  </div>

</div>

</template>


<script>
import Footer from '@/components/Footer'

export default {
  components: {
    Footer
  }

}
</script>

<style scoped>
  #wrapper {
    height: 100vh;
  }

  #content {
    margin-top: 150px;
  }
</style>
