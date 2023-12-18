<script setup>
import {ref, reactive, watch} from "vue";

import Alert from "../components/Alert.vue";
import AddTodoForm from "../components/AddTodoForm.vue";
import Todo from "../components/Todo.vue";
import Modal from "../components/Modal.vue";

import ButtonVue from "../components/ButtonVue.vue";
import Spinner from "../components/Spinner.vue";

import EditTodoForm from "../components/EditTodoForm.vue";

// import api from "../api.js";

import axios from "axios";
import {useFetch} from "../composables/fetch.js";

// let arr = ref([]);
// let isLoading = ref(false);
let isPostingTodo = ref(false);
let alert = reactive({
  show: false,
  message: "",
  tipo: "danger"
});
let editTodoForm = reactive({
  show: false,
  todo: {
    id: 0,
    title: ""
  }
});

// data: arr renombrar de data por arr
const {data: arr, isLoading} = useFetch("/api/todos", {
  onError: (() => showAlert("Ha habido un error al cargar los todos"))
});

// watch(error, (e) => showAlert("Ha habido un error al cargar los todos"));

const showAlert = (message, type = "danger") => {
  alert.show = true;
  alert.message = message;
  alert.tipo = type;
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
  editTodoForm.show = true;
  editTodoForm.todo = {...todo}; // copiar
};

const updateTodo = async () => {
  try {
    const {id, title} = editTodoForm.todo;
    await axios.put(`/api/todos/${id}`, {title});
    const todo = arr.value.find(p_todo => p_todo.id === editTodoForm.todo.id);
    todo.title = editTodoForm.todo.title;
  } catch (e) {
    showAlert("Fallo la actualizacion disculpe las molestias");
  }
  editTodoForm.show = false;
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

// fetchAllTodosAxios();

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
