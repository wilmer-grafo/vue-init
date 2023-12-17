<template>
  <Modal :show="show" @cerrar-modal="$emit('close')">
    <template v-slot:header>
      <h2>Editar un todo</h2>
    </template>
    <template v-slot:content>
      <form class="edit_todo_form">
        <div>
          <label for="titulo">Nombre título</label>
        </div>
        <input type="text"
               id="titulo"
               :value="modelValue"
               @input="$emit('update:modelValue', $event.target.value)"
        >
      </form>
    </template>
    <template #footer>
      <div class="edit-modal-footer">
        <ButtonVue class="edit-todo-submit-btn" @click="$emit('submit')">Editar</ButtonVue>
        <ButtonVue tipo="danger" @click="$emit('close')">Cerrar</ButtonVue>
      </div>
    </template>
  </Modal>
</template>

<script>
import Modal from "./Modal.vue";
import ButtonVue from "./ButtonVue.vue";
export default {
  name: "EditTodoForm",
  components: {
    Modal,
    ButtonVue
  },
  props: ['modelValue', 'show'],
  emits: ['close', 'submit', 'update:modelValue']
}
</script>

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