
import Helper from "../../helper/Helper.js";

export default {
    name:"config-base-url-handler",
    check(options, config) {
        let isChecked = true;
        isChecked &= Helper.isNotEmpty(config.base)
        return isChecked
    },

    handle(options, config) {
        config.baseURL = config.base
    },
}


