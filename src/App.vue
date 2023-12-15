<script setup>
</script>

<template>
  <nav class="nav-bar">
    <img src="./assets/logo.svg" width="50">
    <div class="brand">Registro de cosas por hacer</div>
  </nav>
  <RouterView/>
</template>

<style scoped>
.nav-bar {
  display: flex;
  align-items: center;
  background: var(--navbar-color);
  padding: 20px;
  margin-bottom: 30px;
}

.brand {
  font-size: 2rem;
}
</style>
