import {reactive} from "vue";

function useAlert() {

    // define y declara el estado reactivo

    const alert = reactive({
        show: false,
        message: "",
        variant: "danger",
    });

    // funcion para mostrar la alerta

    const showAlert = (message, variant = "danger") => {
        alert.show = true;
        alert.message = message;
        alert.variant = variant;
    };

    return {
        alert,
        showAlert,
    };

}

// exporta la funcion

export {useAlert};
