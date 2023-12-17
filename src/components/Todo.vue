<template>
  <div class="todo">
    <p>{{ title }}</p>
    <div>
      <!--      <button @click="$emit('remove')" class="remove-todo">&times;</button>-->
      <ButtonVue circle tipo="secondary" class="btn edit-btn" @click.prevent="$emit('editar')">
        <Pencil/>
      </ButtonVue>

<!--      <ButtonVue circle tipo="danger" @clic="$emit('remove')" class="btn">&times;</ButtonVue>-->
      <ButtonVue circle tipo="danger" @click="$emit('remove')" class="btn">&times;</ButtonVue>
    </div>
  </div>
</template>

<script>
import ButtonVue from "./ButtonVue.vue";
import Pencil from "./icons/Pencil.vue";

export default {
  components: {ButtonVue, Pencil},
  props: {
    title: {
      required: true,
      type: String,
    },
  },
  emits: ['remove', 'editar']
}
</script>

<style scoped>
.todo {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--accent-color);
  margin-top: 30px;
  padding: 0 20px 0 20px;
  border-radius: 10px;
}

/*primer div del todo*/
.todo > div {
  display: flex;
}

.edit-btn {
  margin-right: 5px;
}

.btn {
  height: 40px;
  width: 40px;
  font-size: 30px;
}

</style>