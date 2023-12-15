<script setup>
</script>

<template>
  <main class="container">
    <section>
      <form class="add-form">
        <input type="text" placeholder="Escribe una lista por hacer">
        <div>
          <button>Agregar</button>
        </div>
      </form>
    </section>
    <section>
      <div class="todo">
        <p>Pasear al Perro</p>
        <div>
          <button class="remove-todo">&times;</button>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.add-form {
  display: flex;
  justify-content: space-between;
}

.add-form input {
  width: 80%;
  border: solid 2px var(--accent-color);
}

.add-form button {
  background: var(--accent-color);
  color: var(--text-color);
  border: none;
  height: 50px;
}

.todo {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--accent-color);
  margin-top: 30px;
  padding: 0 20px 0 20px;
  border-radius: 10px;
}

.remove-todo {
  border-radius: 50%;
  border: none;
  height: 40px;
  width: 40px;
  font-size: 30px;
  color: var(--text-color);
  background: var(--danger-color);
}
</style>
