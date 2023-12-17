<script setup>
import {ref, onMounted} from "vue";

import Alert from "../components/Alert.vue";
import AddTodoForm from "../components/AddTodoForm.vue";
import Todo from "../components/Todo.vue";
import Modal from "../components/Modal.vue";

import ButtonVue from "../components/ButtonVue.vue";
import Spinner from "../components/Spinner.vue";

import EditTodoForm from "../components/EditTodoForm.vue";

// import api from "../api.js";

import axios from "axios";

let arr = ref([]);
let isLoading = ref(false);
let isPostingTodo = ref(false);
let alert = ref({
  show: false,
  message: "",
  tipo: "danger"
});
let editTodoForm = ref({
  show: false,
  todo: {
    id: 0,
    title: ""
  }
});

const showAlert = (message, type = "danger") => {
  alert.value.show = true;
  alert.value.message = message;
  alert.value.tipo = type;
};

const addTodo = async (title) => {
  if (title === "") {
    showAlert("El titulo es necesario");
    return;
  }

  isPostingTodo.value = true;

  const res = await axios.post('http://localhost:8090/todos', {
    title
  });

  isPostingTodo.value = false;

  arr.value.push(res.data);
};

const removeTodo = async (id) => {
  await axios.delete(`http://localhost:8090/todos/${id}`);
  arr.value = arr.value.filter(p_todo => p_todo.id !== id);
};

const showEditTodoForm = (todo) => {
  editTodoForm.value.show = true;
  editTodoForm.value.todo = {...todo}; // copiar
};

const updateTodo = async () => {
  try {
    const {id, title} = editTodoForm.value.todo;
    await axios.put(`/api/todos/${id}`, {title});
    const todo = arr.value.find(p_todo => p_todo.id === editTodoForm.value.todo.id);
    todo.title = editTodoForm.value.todo.title;
  } catch (e) {
    showAlert("Fallo la actualizacion disculpe las molestias");
  }
  editTodoForm.value.show = false;
};

const fetchAllTodosAxios = async () => {
  isLoading.value = true;
  try {
    const res = await axios.get('/api/todos');
    arr.value = res.data;
  } catch (e) {
    if (e.response.status === 500)
      showAlert("No se pudo obtener el listado :(");
    showAlert("Revisa la conexion");
  }
  isLoading.value = false;
};

fetchAllTodosAxios();

</script>

<template>
  <main class="container">
    <EditTodoForm
        :show="editTodoForm.show"
        @close="editTodoForm.show = false"
        @submit="updateTodo"
        v-model="editTodoForm.todo.title"
    />
    <Alert :show="alert.show"
           v-bind:message="alert.message"
           :tipo="alert.tipo"
           @cerrar="alert.show = false"
    />
    <section>
      <AddTodoForm :isDisabled="isPostingTodo" @adicionar="addTodo"/>
    </section>
    <section>
      <Spinner v-if="isLoading" class="cargando"/>
      <div v-else>
        <Todo
            v-for="todo in arr"
            :key="todo.id"
            :title="todo.title"
            @remove="removeTodo(todo.id)"
            @editar="showEditTodoForm(todo)"
        />
      </div>
    </section>
  </main>
</template>

<style scoped>
.cargando {
  margin: 30px auto auto;
}
</style>
