<template>
  <Spinner class="cargando" v-if="isLoading"/>

  <Alert v-bind="alert" @close="alert.show = false"/>

  <TodoForm
      v-if="todo !== null"
      :data="todo"
      :isLoading="isUpdatingTodo"
      title="Edit Todo"
      @submit="submit"
  />
</template>

<script setup>

// importar componentes
import TodoForm from "../components/TodoForm.vue";
import Spinner from "../components/Spinner.vue";
import Alert from "../components/Alert.vue";
// otras importaciones
import {useFetch} from "../composables/fetch.js";
import {useAlert} from "../composables/alert";
import {ref} from "vue";
import {useRouter} from "vue-router";
import axios from "axios";

const props = defineProps(["id"]);

const {alert, showAlert} = useAlert();

const isUpdatingTodo = ref(false);

const router = useRouter();

const {data: todo, isLoading} = useFetch(`/api/todos/${props.id}`, {
  onError: () => showAlert("Failed loading todo"),
});

async function submit(todo) {
  isUpdatingTodo.value = true;
  try {
    await axios.put(`/api/todos/${props.id}`, todo);
    showAlert("Se ha actualizado los datos, correctamente", "success");
    setTimeout(() => {
      router.push("/");
    }, 1000);
  } catch (e) {
    console.error(e);
    showAlert("Failed updating todo");
  }
  isUpdatingTodo.value = false;
}

</script>

<style scoped>

.cargando {
  margin: auto;
}

</style>