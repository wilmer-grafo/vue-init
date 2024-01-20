<template>

  <div class="todo">

    <p>{{ todo.title }}</p>
    <p>{{ todo.description }}</p>
    <p>{{ todo.date }}</p>

    <div>

      <!-- editar -->
      <Btn
          circle
          variant="secondary"
          @click="$emit('edit')"
          class="btn edit-todo-btn"
      >
        <!-- icono -->
        <Pencil size="20px"/>

      </Btn>

      <!-- remover -->
      <Btn circle variant="danger" @click="$emit('remove')" class="btn">
        &times;
      </Btn>

    </div>
  </div>
</template>

<script setup>

import Btn from "./Btn.vue";
import Pencil from "./icons/Pencil.vue";

// define una propiedad
defineProps({
  todo: {
    required: true,
    type: Object,
  },
});
// define eventos
defineEmits(["remove", "edit"]);

</script>

<style scoped>

.todo {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--accent-color);
  margin-top: 30px;
  padding: 0 20px 0 20px;
  border-radius: 10px;
}

.todo > div {
  display: flex;
}

.edit-todo-btn {
  margin-right: 5px;
}

.btn {
  height: 40px;
  width: 40px;
  font-size: 30px;
}

@media (max-width: 680px) {
  .todo {
    justify-content: center;
    flex-direction: column;
    padding: 20px;
  }
}

</style>