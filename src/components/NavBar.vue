<template>
  <nav class="navbar">
    <div class="logo">
      <img src="@/assets/logo.svg" width="50"/>
      <div class="brand">Ejemplo básico</div>
    </div>

    <div class="links">
      <ul>
        <li>
          <RouterLink to="/">Inicio</RouterLink>
        </li>
        <li>
          <RouterLink to="/todos/create">Agregar</RouterLink>
        </li>
        <li>
          <RouterLink to="/about">Acerca</RouterLink>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style scoped>

.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--navbar-color);
  padding: 10px;
  margin-bottom: 30px;
}

.brand {
  font-size: 2rem;
}

.logo {
  display: flex;
  align-items: center;
}

.links ul {
  display: flex;
  align-items: center;
  padding: 20px;
  list-style: none;
  margin: 0;
}

.links a {
  font-size: 20px;
  margin-left: 10px;
  text-decoration: none;
  color: var(--text-color);
}

a.router-link-active {
  color: var(--accent-color);
}

@media (max-width: 680px) {

  .navbar {
    display: block;
  }

  .links {
    margin-top: 10px;
  }

  .links ul {
    margin: 0;
    padding: 0;
  }

  .links a {
    font-size: 10px;
  }

}

</style>