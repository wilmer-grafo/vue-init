<script setup>
import {ref} from "vue";

import Alert from "../components/Alert.vue";
import AddTodoForm from "../components/AddTodoForm.vue";
import Todo from "../components/Todo.vue";
import Modal from "../components/Modal.vue";

import ButtonVue from "../components/ButtonVue.vue";

let arr = ref([]);
let showAlert = ref(false);
let showEditModal = ref(false);
let editTodoForm = ref({
  show: false,
  todo: {
    id: 0,
    title: ""
  }
});

const addTodo = (title) => {
  if (title === "") {
    showAlert.value = true;
    return;
  }
  arr.value.push({
    id: Math.floor(Math.random() * 1000),
    title
  });
};

const removeTodo = (p_id) => {
  arr.value = arr.value.filter(p_todo => p_todo.id !== p_id);
};

const showEditTodoForm = (todo) => {
  editTodoForm.value.show = true;
  editTodoForm.value.todo = {...todo}; // copiar
};

const updateTodo = () => {
  const todo = arr.value.find(p_todo => p_todo.id === editTodoForm.value.todo.id);
  todo.title = editTodoForm.value.todo.title;
  editTodoForm.value.show = false;
};

// onMounted(() => {
//   console.log(`the component is now mounted.`);
// });
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
          <ButtonVue class="edit-todo-submit-btn" @clic="updateTodo">Editar</ButtonVue>
          <ButtonVue tipo="danger" @clic="editTodoForm.show = false">Cerrar</ButtonVue>
        </div>
      </template>
    </Modal>
    <Alert :show="showAlert"
           v-bind:message="'El titulo es necesario'"
           @cerrar="showAlert = false"
    />
    <section>
      <AddTodoForm @adicionar="addTodo"/>
    </section>
    <section>
      <Todo
          v-for="todo in arr"
          :key="todo.id"
          :title="todo.title"
          @remove="removeTodo(todo.id)"
          @editar="showEditTodoForm(todo)"
      />
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
</style>
