<template>
  <form class="add-form">
    <input v-model="todoTitle" type="text" placeholder="Escribe una lista por hacer" id="todo_title">
    <div>
      <ButtonVue
          :disabled="isDisabled"
          class="btn"
          @click.prevent="agregar"
          type="submit">
        <Spinner v-if="isDisabled" />
        <span v-else>Agregar Item</span>
      </ButtonVue>
    </div>
  </form>
</template>

<script setup>
import { ref } from "vue";

import ButtonVue from "./Button.vue";
import Spinner from "./Spinner.vue";

const todoTitle = ref("");

defineProps({
  isDisabled: {
    default: false,
    type: Boolean
  }
});

const emit = defineEmits(["adicionar"]);

function agregar() {
  emit('adicionar', todoTitle.value);
  todoTitle.value = "";
}

</script>

<style scoped>
.add-form {
  display: flex;
  justify-content: space-between;
}

.add-form input {
  width: 80%;
  border: solid 2px var(--accent-color);
}

.btn {
  height: 50px;
}
</style>