<template>
  <!--  @click.prevent="$emit('clic')"-->
  <button
      class="btn"
      :style="{backgroundColor}"
      :class="{ circle: applyCircleClass}"
      v-bind="$attrs"
  >
    <!--poner cosas dentro de un cmp con slots-->
    <slot></slot>
  </button>
</template>

<script>
export default {
  // emits: ['clic'],
  props: {
    // type:variant
    tipo: {
      required: false,
      default: "success",
      validator(value) {
        const options = ["danger", "warning", "info", "success", "secondary"];
        return options.includes(value);
      }
    },
    circle: {
      default: false,
      type: Boolean
    }
  },
  computed: {
    backgroundColor() {
      const options = {
        danger: "var(--danger-color)",
        info: "var(--info-color)",
        warning: "var(--warning-color)",
        success: "var(--accent-color)",
        secondary: "var(--secondary-color)"
      };
      return options[this.tipo]
    },
    applyCircleClass() {
      return this.circle;
    }
  },
}
</script>

<style scoped>
.btn {
  color: var(--text-color);
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}

.btn:disabled {
  opacity: 80%;
}

.circle {
  border-radius: 50%;
}
</style>