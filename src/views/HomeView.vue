<script setup>
import {ref} from "vue";

let todoTitle = ref("");
let arr = ref([]);
let showAlert = ref(false);
// const updateTitle = (e) => {
//   todoTitle = e.target.value;
// };

const addTodo = () => {
  if (todoTitle.value === "") {
    showAlert.value = true;
    return;
  }
  // arr.value = arr.value.concat([todoTitle.value]); // mutable
  arr.value.push({
    id: Math.floor(Math.random() * 1000),
    title: todoTitle.value
  }); // in mutable
  todoTitle.value = "";
};

const removeTodo = (p_title) => {
  // arr.value.splice(i, 1); // mutable
  arr.value = arr.value.filter(p_todo => p_todo !== p_title); // in mutable
};

// export default {
//   setup() {
//     let todoTitle = ref("");
//     const arr = ref([]);
//
//     const insertElement = () => {
//       arr.value.push(todoTitle);
//     };
//
//     return {
//       todoTitle,
//       arr,
//       insertElement,
//     };
//   },
// };

</script>

<template>
  <main class="container">
    <div v-if="showAlert" class="alert">
      <div>El titulo es necesario</div>
      <div @click="showAlert = false" class="close-alert">&times;</div>
    </div>
    <section>
      <form class="add-form">
        <!--        <input v-on:input="updateTitle" type="text" placeholder="Escribe una lista por hacer">-->
        <input v-model="todoTitle" type="text" placeholder="Escribe una lista por hacer">
        <div>
          <button @click.prevent="addTodo">Agregar</button>
        </div>
      </form>
    </section>
    <section>
      <div v-for="item in arr" v-bind:key="item.id" class="todo">
        <p>{{ item.title }}</p>
        <div>
          <button @click="removeTodo(item)" class="remove-todo">&times;</button>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.alert {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--danger-color);
  margin-bottom: 20px;
  padding: 0 20px 0 20px;
  border-radius: 10px;
  height: 50px;
}

.close-alert {
  font-size: 50px;
  cursor: pointer;
}

.add-form {
  display: flex;
  justify-content: space-between;
}

.add-form input {
  width: 80%;
  border: solid 2px var(--accent-color);
}

.add-form button {
  background: var(--accent-color);
  color: var(--text-color);
  border: none;
  height: 50px;
}

.todo {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--accent-color);
  margin-top: 30px;
  padding: 0 20px 0 20px;
  border-radius: 10px;
}

.remove-todo {
  border-radius: 50%;
  border: none;
  height: 40px;
  width: 40px;
  font-size: 30px;
  color: var(--text-color);
  background: var(--danger-color);
}
</style>
