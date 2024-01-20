<template>

  <div class="form">

    <h1>{{ title }}</h1>

    <form class="edit-todo-form">
      <div class="form-field">
        <label for="title">Todo Title</label>
      </div>
      <input id="title" type="text" v-model="todo.title"/>

      <div class="form-field">
        <label for="description">Todo Description</label>
      </div>
      <textarea id="description" v-model="todo.description"/>

      <div class="form-field">
        <label for="date">Todo Date</label>
      </div>
      <input id="date" type="date" v-model="todo.date"/>

      <div class="submit">
        <Btn :disabled="isLoading" @click.prevent="$emit('submit', todo)">
          <!-- mostrar animacion -->
          <Spinner v-if="isLoading"/>
          <span v-else>Submit</span>
        </Btn>
      </div>
    </form>

  </div>

</template>

<script setup>

import Btn from "@/components/Btn.vue";
import Spinner from "@/components/Spinner.vue";
import {reactive} from "vue";

// define propiedades
const props = defineProps({
  title: {
    default: "Todo Form",
  },
  data: {
    type: Object,
    default: () => ({
      title: "",
      description: "",
      date: null,
    }),
  },
  isLoading: {
    default: false,
  },
});

const todo = reactive({...props.data});

// define un evento
defineEmits(["submit"]);

</script>

<style scoped>

.form {
  background-color: var(--navbar-color);
  padding: 20px;
  border-radius: 10px;
}

.form-field {
  margin-top: 20px;
}

.edit-todo-form > input {
  width: 100%;
  height: 30px;
  border: 1px solid var(--accent-color);
}

.edit-todo-form > textarea {
  width: 100%;
  height: 50px;
  resize: none;
  border: 1px solid var(--accent-color);
}

.submit {
  margin-top: 20px;
  display: flex;
  justify-content: end;
}

.submit button {
  height: 50px;
  width: 80px;
  border-radius: 5px;
}

input {
  width: 60%;
  height: 25px;
  margin: 0 auto;
  border-radius: 10px;
}

</style>