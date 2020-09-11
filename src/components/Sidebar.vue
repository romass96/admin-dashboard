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

  <router-link tag="li" active-class="active" to="/feedbacks" class="nav-item">
    <a class="nav-link">
      <i class="fas fa-comment-alt"></i>
      <span class="ml-1">Отзывы</span>
    </a>
  </router-link>

  <li class="nav-item">
    <a class="nav-link" data-toggle="collapse" data-target="#orderMenu" aria-expanded="true" aria-controls="orderMenu">
      <i class="fas fa-fw fa-shopping-cart"></i>
      <span class="ml-1">Заказы</span>
    </a>
    <div id="orderMenu" class="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">
      <div class="bg-white py-2 collapse-inner rounded">
        <a class="collapse-item" href="login.html">Новые</a>
        <a class="collapse-item" href="register.html">Принятые</a>
        <a class="collapse-item" href="forgot-password.html">Выполненные</a>
        <a class="collapse-item" href="forgot-password.html">Отмененные</a>
        <a class="collapse-item" href="forgot-password.html">Оплаченные</a>
      </div>
    </div>
  </li>

  <!-- <router-link tag="li" active-class="active" to="/orders" class="nav-item">
    <a class="nav-link">
      <i class="fas fa-fw fa-shopping-cart"></i>
      <span class="ml-1">Заказы</span>
    </a>
  </router-link> -->

  <router-link tag="li" active-class="active" to="/feedbacks" class="nav-item">
    <a class="nav-link">
      <i class="fas fa-tags"></i>
      <span class="ml-1">Скидки</span>
    </a>
  </router-link>

  <router-link tag="li" active-class="active" to="/feedbacks" class="nav-item">
    <a class="nav-link">
      <i class="fas fa-envelope"></i>
      <span class="ml-1">Сообщения</span>
    </a>
  </router-link>

  <router-link tag="li" active-class="active" to="/feedbacks" class="nav-item">
    <a class="nav-link">
      <i class="fas fa-cog"></i>
      <span class="ml-1">Настройки</span>
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
