npm i axios

export default {
  emits: ['cerrar'],
  setup(props, context) {
    const setNewBackground = computed(() => {
      const options = {
        danger: "var(--danger-color)",
        info: "var(--info-color)",
        warning: "var(--warning-color)"
      };
      return options[props.tipo];
    });

    function closeAlert() {
      context.emit('cerrar');
    }

    return {
      setNewBackground,
      closeAlert
    };
  }
}


con los composables para re utilizar codigo

no se puede des estrocturar las propiedades

los composables se nombran por convecion use