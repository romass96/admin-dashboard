<template>
<div class="container">

  <!-- Outer Row -->
  <div class="row justify-content-center">
    <div class="col-xl-10 col-lg-12 col-md-9">
      <div class="card o-hidden border-0 shadow-lg my-5">
        <div class="card-body p-0">
          <router-view />
        </div>
      </div>
    </div>
  </div>

</div>
</template>

<style>
body {
  background-color: #6f2ab0;
  background-image: -webkit-gradient(linear, left top, left bottom, color-stop(10%, #6f2ab0), to(#491074));
  background-image: linear-gradient(180deg, #6f2ab0 10%, #491074 100%);
  background-size: cover;
}
</style>
