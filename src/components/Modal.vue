<template>
  <!--  si se usa v-if quitar v-show="show" -->
  <div ref="modal" v-show="show" class="modal">
    <div class="modal-content">
      <div class="modal-header">
        <slot name="header"/>
      </div>

      <div class="modal-body">
        <slot name="content"/>
      </div>

      <div class="modal-footer">
        <slot name="footer"/>
      </div>
    </div>
  </div>
</template>

<script>
// donde esta el clic; pero se tiene que eliminar o quitar los eventos
// window.addEventListener('click', (e) => console.log(e.target));
export default {
  name: "Modal",
  props: {
    show: {
      default: false
    }
  },
  data() {
    return {
      clickListenerMethod: (e) => {
        // console.log(e.target);
        if (e.target === this.$refs.modal) {
          this.$emit('cerrar-modal');
        }
      },
      closeOnEscapeListenerMethod: (e) => {
        if (e.key === "Escape") {
          this.$emit('cerrar-modal');
        }
      }
    }
  },
  emits: ['cerrar-modal'],
  mounted() {
    // para cerrar el modal desde fuera del modal
    window.addEventListener('click', this.clickListenerMethod); // enviar la referencia del metodo no ejecutar ()
    window.addEventListener('keydown', this.closeOnEscapeListenerMethod);
  },
  beforeUnmount() {
    window.removeEventListener('click', this.clickListenerMethod);
    window.removeEventListener('keydown', this.closeOnEscapeListenerMethod);
  }
}
</script>

<style scoped>
.modal {
  position: fixed;
  z-index: 1;
  padding-top: 100px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  position: relative;
  background-color: #fefefe;
  margin: auto;
  padding: 0;
  width: 80%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  -webkit-animation-name: animatetop;
  -webkit-animation-duration: 0.4s;
  animation-name: animatetop;
  animation-duration: 0.4s;
}

@-webkit-keyframes animatetop {
  from {
    top: -300px;
    opacity: 0;
  }
  to {
    top: 0;
    opacity: 1;
  }
}

@keyframes animatetop {
  from {
    top: -300px;
    opacity: 0;
  }
  to {
    top: 0;
    opacity: 1;
  }
}

.modal-header {
  padding: 2px 16px;
  background-color: rgb(83, 83, 93);
  color: white;
}

.modal-body {
  padding: 16px;
  background-color: var(--background-color);
}

.modal-footer {
  padding: 2px 16px;
  background-color: rgb(83, 83, 93);
  color: white;
}
</style>