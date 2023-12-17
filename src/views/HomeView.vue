<script setup>
import {ref, onMounted} from "vue";

import Alert from "../components/Alert.vue";
import AddTodoForm from "../components/AddTodoForm.vue";
import Todo from "../components/Todo.vue";
import Modal from "../components/Modal.vue";

import ButtonVue from "../components/ButtonVue.vue";
import Spinner from "../components/Spinner.vue";

import api from "../api.js";

import axios from "axios";

let arr = ref([]);
// let showAlert = ref(false);
let isLoading = ref(false);
let isPostingTodo = ref(false);
let alert = ref({
  show: false,
  message: "",
  tipo: "danger"
});
let showEditModal = ref(false);
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
    // showAlert.value = true;
    // alert.value.show = true;
    showAlert("El titulo es necesario");
    return;
  }
  isPostingTodo.value = true;
  const res = await axios.post('http://localhost:8090/todos', {
    title
  });
  isPostingTodo.value = false;

  // ojo actualizar despues de que tenga exito, porque puede fallar
  arr.value.push(res.data);

  // o directamente
  // fetchAllTodosAxios();

  // arr.value.push({
  //   id: Math.floor(Math.random() * 1000),
  //   title
  // });
};

// const removeTodo = (p_id) => {
//   arr.value = arr.value.filter(p_todo => p_todo.id !== p_id);
// };

const removeTodo = async (id) => {
  await axios.delete(`http://localhost:8090/todos/${id}`);
  arr.value = arr.value.filter(p_todo => p_todo.id !== id);
  // o directamente
  // fetchAllTodosAxios();
};

const showEditTodoForm = (todo) => {
  editTodoForm.value.show = true;
  editTodoForm.value.todo = {...todo}; // copiar
};

// const updateTodo = () => {
//   const todo = arr.value.find(p_todo => p_todo.id === editTodoForm.value.todo.id);
//   todo.title = editTodoForm.value.todo.title;
//   editTodoForm.value.show = false;
// };

const updateTodo = async () => {
  try {
    const { id, title } = editTodoForm.value.todo;
    await axios.put(`/api/todos/${id}`, { title });
    const todo = arr.value.find(p_todo => p_todo.id === editTodoForm.value.todo.id);
    todo.title = editTodoForm.value.todo.title;
  } catch (e) {
    showAlert("Fallo la actualizacion disculpe las molestias");
  }
  editTodoForm.value.show = false;
};

const fetchAllTodos = async () => {
  const res = await fetch('http://localhost:8090/todos');
  arr.value = await res.json();
  // console.log(arr.value);
};

const fetchAllTodosAxios = async () => {
  isLoading.value = true;
  try {
    // const res = await axios.get('http://localhost:8090/todos');
    const res = await axios.get('/api/todos');
    arr.value = res.data;
  } catch (e) {
    if (e.response.status === 500)
      showAlert("No se pudo obtener el listado :(");
    showAlert("Revisa la conexion");
  }
  isLoading.value = false;
};

onMounted(() => {
  // console.log(`${api}/todos`);
  // console.log(import.meta.env.VITE_API_URL);
  // fetchAllTodos();
  fetchAllTodosAxios();
});
</script>

<template>
  <main class="container">
    <!--    :show="showEditModal";  para que no aparesca el target usar v-if en lugar de :show-->
    <Modal :show="editTodoForm.show" @cerrar-modal="editTodoForm.show = false">
      <template v-slot:header>
        <h2>Editar un todo</h2>
      </template>
      <template v-slot:content>
        <form class="edit_todo_form">
          <div>
            <label for="titulo">Nombre título</label>
          </div>
          <input type="text" id="titulo" v-model="editTodoForm.todo.title">
        </form>
      </template>
      <template #footer>
        <div class="edit-modal-footer">
          <!--          <ButtonVue class="edit-todo-submit-btn" @clic="updateTodo">Editar</ButtonVue>-->
          <!--          <ButtonVue tipo="danger" @clic="editTodoForm.show = false">Cerrar</ButtonVue>-->
          <ButtonVue class="edit-todo-submit-btn" @click.prevent="updateTodo">Editar</ButtonVue>
          <ButtonVue tipo="danger" @click="editTodoForm.show = false">Cerrar</ButtonVue>
        </div>
      </template>
    </Modal>
    <!--    v-bind:message="'El titulo es necesario'"-->
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
.edit_todo_form > input {
  height: 30px;
  width: 100%;
  border: 1px solid var(--accent-color);
}

.edit-modal-footer {
  display: flex;
  justify-content: end;
  padding: 10px;
}

.edit-todo-submit-btn {
  margin-right: 5px;
}

.cargando {
  margin: 30px auto auto;
}
</style>
