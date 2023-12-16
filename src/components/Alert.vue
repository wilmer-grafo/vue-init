<!--:style="{ backgroundColor: tipo === 'danger' ? 'var(&#45;&#45;danger-color)': 'var(&#45;&#45;info-color)'}"-->
<template>
  <div v-if="show"
       class="alert"
       :style="{ backgroundColor: setNewBackground}"
  >
    <div>{{ message }}</div>
    <!--<div @click="show = false" class="close-alert">&times;</div>-->
    <div @click="closeAlert" class="close-alert">&times;</div>
  </div>
</template>

<script>
export default {
  name: "Alert",
  // props: ['show', 'message'],
  props: {
    message: {
      required: true,
      type: String
    },
    show: {
      required: true,
      type: Boolean
    },
    tipo: {
      required: false,
      default: "danger",
      validator(value) {
        return ["danger", "warning", "info"].includes(value);
      }
    }
  },
  computed: {
    setNewBackground() {
      const options = {
        danger: "var(--danger-color)",
        info: "var(--info-color)",
        warning: "var(--warning-color)"
      };
      return options[this.tipo]
    }
  },
  emits: ['cerrar'],
  methods: {
    closeAlert() {
      this.$emit('cerrar');
    }
  }
}
</script>

<style scoped>
.alert {
  display: flex;
  justify-content: space-between;
  align-items: center;
  /*background: var(--danger-color);*/
  margin-bottom: 20px;
  padding: 0 20px 0 20px;
  border-radius: 10px;
  height: 50px;
}

.close-alert {
  font-size: 50px;
  cursor: pointer;
}

</style>