<template>
  <nav class="nav-bar">
    <div class="logo">
      <img src="@/assets/logo.svg" width="50"/>
      <div class="brand">Cosas por hacer</div>
    </div>

    <div class="links">
      <ul>
        <li>
          <RouterLink class="route-link" to="/">Home</RouterLink>
        </li>
<!--        <li>-->
<!--          <RouterLink class="route-link" to="/todos/create">Add Todo</RouterLink>-->
<!--        </li>-->
        <li>
          <RouterLink class="route-link" to="/about">About</RouterLink>
        </li>
      </ul>
    </div>

  </nav>
</template>

<style scoped>

.nav-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--navbar-color);
  padding: 10px;
  margin-bottom: 15px;
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

.route-link {
  font-size: 20px;
  margin-left: 10px;
  text-decoration: none;
  color: var(--text-color);
  /*pointer-events: none;*/ /*DISABLE LINKS*/
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

  .route-link {
    font-size: 10px;
  }
}

</style>