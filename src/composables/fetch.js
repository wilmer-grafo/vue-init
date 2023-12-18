import {ref, watch} from "vue";
import axios from "axios";

function useFetch(url, options = {onError: null}) {
    // reactivos
    const data = ref(null);
    const error = ref(null);
    const isLoading = ref(true);

    let stopErrorWatcher = null;

    if (options.onError !== null) {
        // declarar un watch
        stopErrorWatcher = watch(error, (e) => options.onError(e));
    }

    // usando promesas
    axios
        .get(url)
        .then((res) => (data.value = res.data))
        .catch((e) => (error.value = e))
        .finally(() => {
            isLoading.value = false;
            if (stopErrorWatcher !== null) {
                // parar el watcher
                stopErrorWatcher();
            }
        });

    return {
        data,
        error,
        isLoading,
    };
}

export {useFetch};