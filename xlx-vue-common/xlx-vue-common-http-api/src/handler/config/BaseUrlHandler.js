
import Helper from "../../helper/Helper.js";

export default {
    name:"config-base-url-handler",
    check(config) {
        let isChecked = true;
        isChecked &= Helper.isNotEmpty(config.base)
        return isChecked
    },

    handle(config) { 
        config.baseURL = config.base
    },
}


