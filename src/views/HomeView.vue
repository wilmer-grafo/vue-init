<template>

  <Alert v-bind="alert" @close="alert.show = false"/>

  <section>

    <Spinner class="spinner" v-if="isLoading"/>

    <div v-else>

      <Todo
          v-for="v_todo in todos"
          :key="v_todo.id"
          :todo="v_todo"
          @remove="removeTodo(v_todo.id)"
          @edit="$router.push(`/todos/${v_todo.id}/edit`)"
      />

    </div>

  </section>

</template>

<script setup>

import axios from "axios";

// importacion de componentes
import Alert from "@/components/Alert.vue";
import Todo from "@/components/Todo.vue";
import Spinner from "@/components/Spinner.vue";

import {ref} from "vue";
import {useFetch} from "../composables/fetch";
import {useAlert} from "../composables/alert.js";

// extrae la el objeto reactivo y la funcion
const {alert, showAlert} = useAlert();

const {data: todos, isLoading} = useFetch("/api/todos", {
  onError: () => showAlert("La carga de registros ha fallado"),
});

async function removeTodo(id) {
  await axios.delete(`/api/todos/${id}`);
  todos.value = todos.value.filter((todo) => todo.id !== id);
}

</script>

<style scoped>
.spinner {
  margin: 30px auto auto;
  /*puede ser simplificado*/
  /*margin: auto;*/
  /*margin-top: 30px;*/
}
</style>