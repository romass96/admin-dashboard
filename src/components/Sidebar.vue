<template>
<ul class="navbar-nav bg-gradient-purple sidebar sidebar-dark accordion" id="accordionSidebar">

  <!-- Sidebar - Brand -->
  <a class="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
    <div class="sidebar-brand-text mx-3">Админ панель</div>
  </a>

  <!-- Divider -->
  <hr class="sidebar-divider my-0">

  <router-link tag="li" active-class="active" to="/dashboard" exact class="nav-item">
    <a class="nav-link" href="index.html">
      <i class="fas fa-fw fa-tachometer-alt"></i>
      <span class="ml-1">Главная</span></a>
  </router-link>

  <!-- Divider -->
  <hr class="sidebar-divider">

  <!-- Heading -->
  <div class="sidebar-heading">
    Управление
  </div>

  <router-link tag="li" active-class="active" to="/categories" class="nav-item">
    <a class="nav-link">
      <i class="fas fa-fw fa-folder"></i>
      <span class="ml-1">Категории</span>
    </a>
  </router-link>

  <router-link tag="li" active-class="active" to="/products" class="nav-item">
    <a class="nav-link">
      <i class="fas fa-fw fa-briefcase"></i>
      <span class="ml-1">Товары</span>
    </a>
  </router-link>

  <router-link tag="li" active-class="active" to="/clients" class="nav-item">
    <a class="nav-link">
      <i class="fas fa-fw fa-user"></i>
      <span class="ml-1">Клиенты</span>
    </a>
  </router-link>

  <router-link tag="li" active-class="active" to="/admins" class="nav-item">
    <a class="nav-link">
      <i class="fas fa-fw fa-user-shield"></i>
      <span class="ml-1">Админы</span>
    </a>
  </router-link>

  <router-link tag="li" active-class="active" to="/orders" class="nav-item">
    <a class="nav-link">
      <i class="fas fa-fw fa-shopping-cart"></i>
      <span class="ml-1">Заказы</span>
    </a>
  </router-link>

  <li class="nav-item">
    <a class="nav-link" data-toggle="collapse" data-target="#feedbackMenu" aria-expanded="true" aria-controls="feedbackMenu">
      <i class="fas fa-comment-alt"></i>
      <span class="ml-1">Отзывы</span>
    </a>
    <div id="feedbackMenu" class="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">
      <div class="bg-white py-2 collapse-inner rounded">
        <router-link to="/feedbacks" class="collapse-item" :exact="true">Все</router-link>
        <router-link to="/feedbacks?period=today" class="collapse-item">За сегодня</router-link>
        <router-link to="/feedbacks?period=month" class="collapse-item">За месяц</router-link>
        <router-link to="/feedbacks?feedbackType=negative" :exact="true" class="collapse-item">Негативные</router-link>
        <router-link to="/feedbacks?feedbackType=positive" :exact="true" class="collapse-item">Положительные</router-link>
      </div>
    </div>
  </li>

  <router-link tag="li" active-class="active" to="/discounts" class="nav-item">
    <a class="nav-link">
      <i class="fas fa-tags"></i>
      <span class="ml-1">Скидки (в разработке)</span>
    </a>
  </router-link>

  <router-link tag="li" active-class="active" to="/messages" class="nav-item">
    <a class="nav-link">
      <i class="fas fa-envelope"></i>
      <span class="ml-1">Сообщения (в разработке)</span>
    </a>
  </router-link>

  <router-link tag="li" active-class="active" to="/newsletters" class="nav-item">
    <a class="nav-link">
      <i class="fas fa-newspaper"></i>
      <span class="ml-1">Рассылки</span>
    </a>
  </router-link>

  <router-link tag="li" active-class="active" to="/settings" class="nav-item">
    <a class="nav-link">
      <i class="fas fa-cog"></i>
      <span class="ml-1">Настройки (в разработке)</span>
    </a>
  </router-link>

  <!-- Divider -->
  <hr class="sidebar-divider d-none d-md-block">

  <!-- Sidebar Toggler (Sidebar) -->
  <div class="text-center d-none d-md-inline">
    <button class="rounded-circle border-0" id="sidebarToggle"></button>
  </div>

</ul>
</template>

<style scoped>
li.nav-item > a {
  cursor: pointer;
}
</style>
