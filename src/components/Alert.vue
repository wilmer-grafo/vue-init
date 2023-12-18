<template>
  <div v-if="show"
       class="alert"
       :style="{ backgroundColor: setNewBackground}"
  >
    <div>{{ message }}</div>
    <div @click="closeAlert" class="close-alert">&times;</div>
  </div>
</template>

<script setup>

import {useBackgroundColor, backgroundColorProps} from "../composables/backgroundColor.js";

const props = defineProps({
  ...backgroundColorProps,
  message: {
    required: true,
    type: String
  },
  show: {
    required: true,
    type: Boolean
  },
});

const emit = defineEmits(['cerrar']);

const setNewBackground = useBackgroundColor(props);

function closeAlert() {
  emit('cerrar');
}

</script>

<style scoped>

.alert {
  display: flex;
  justify-content: space-between;
  align-items: center;
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