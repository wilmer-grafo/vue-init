<template>
  <Spinner class="spinner" v-if="isLoading"/>

  <Alert
      :message="alert.message"
      tipo="danger"
      :show="alert.show"
  />

  <div class="form" v-if="todo !== null">
    <form class="edit_todo_form">
      <div class="form">
        <h1>Editar Todo</h1>
        <label for="titulo">Nombre título</label>
      </div>
      <input type="text"
             id="titulo"
             name="titulo"
             v-model="todo.title"
      >
    </form>

    <div class="submit">
      <Btn :disabled="isUpdatingTodo" @click="updateTodo">
        <Spinner v-if="isUpdatingTodo"/>
        <span v-else>Enviar</span>
      </Btn>
    </div>
  </div>
</template>

<script setup>
import Btn from "@/components/Button.vue";
import Spinner from "../components/Spinner.vue";
import Alert from "../components/Alert.vue";

import {useRouter} from "vue-router";
import {useFetch} from "../composables/fetch";
import axios from "axios";
import {reactive, ref} from "vue";

const props = defineProps(["id"]);
const alert = reactive({message: "", show: false});
const isUpdatingTodo = ref(false);

// const route = useRoute();
const router = useRouter();
// const {data: todo, error, isLoading} = useFetch(`/api/todos/${route.params.id}`);
const {data: todo, isLoading} = useFetch(`/api/todos/${props.id}`, {
  onError: () => {
    alert.show = true;
    alert.message = "Failed loading todo";
  }
});

const updateTodo = async () => {
  isUpdatingTodo.value = true;
  try {
    await axios.put(`/api/todos/${props.id}`, todo.value);
    await router.push('/');
  } catch (e) {
    alert.show = true;
    alert.message = "Failed updating todo";
  }
  isUpdatingTodo.value = false;
};

</script>

<style scoped>

.form {
  background-color: var(--navbar-color);
  padding: 20px;
  border-radius: 10px;
}

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

.submit {
  margin-top: 20px;
  display: flex;
  justify-content: end;
}

.submit button {
  height: 50px;
  width: 80px;
}

.spinner {
  margin: auto;
}

</style>