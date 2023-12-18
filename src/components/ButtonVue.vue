<template>
  <button
      class="btn"
      :style="{backgroundColor}"
      :class="{ circle: applyCircleClass}"
      v-bind="$attrs"
  >
    <slot></slot>
  </button>
</template>

<script setup>
import {computed} from "vue";

const props = defineProps({
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
});

const applyCircleClass = computed(() => props.circle);

const backgroundColor = computed(() => {
  const options = {
    danger: "var(--danger-color)",
    info: "var(--info-color)",
    warning: "var(--warning-color)",
    success: "var(--accent-color)",
    secondary: "var(--secondary-color)"
  };
  return options[props.tipo];
});

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