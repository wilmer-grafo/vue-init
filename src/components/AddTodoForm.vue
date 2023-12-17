<template>
  <form class="add-form">
    <input v-model="todoTitle" type="text" placeholder="Escribe una lista por hacer" id="todo_title">
    <div>
      <!--      <button @click.prevent="$emit('adicionar', todoTitle)">Agregar</button>-->
      <!--      <button @click.prevent="agregar">Agregar</button>-->
      <!--      <ButtonVue class="btn" @clic="agregar">-->
      <!--        Agregar-->
      <!--      </ButtonVue>-->
      <ButtonVue
          :disabled="isDisabled"
          class="btn" @click.prevent="agregar" type="submit">
        <Spinner v-if="isDisabled" />
        <span v-else>Agregar</span>
      </ButtonVue>
    </div>
  </form>
</template>

<script>
import ButtonVue from "./ButtonVue.vue";
import Spinner from "./Spinner.vue";

export default {
  components: {ButtonVue, Spinner},
  data() {
    return {
      todoTitle: ""
    }
  },
  emits: ['adicionar'],
  props: {
    isDisabled: {
      default: false,
      type: Boolean
    }
  },
  methods: {
    agregar() {
      this.$emit('adicionar', this.todoTitle);
      this.todoTitle = "";
    }
  }
}
</script>

<style scoped>
.add-form {
  display: flex;
  justify-content: space-between;
}

.add-form input {
  width: 80%;
  border: solid 2px var(--accent-color);
}

.btn {
  height: 50px;
}
</style>