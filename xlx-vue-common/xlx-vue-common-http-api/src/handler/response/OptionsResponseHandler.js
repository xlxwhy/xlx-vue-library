



import Helper from "../../helper/Helper.js";

export default {
    name: "response-options-handler",
    check(options, config, res) {
        let isChecked = true;
        isChecked = Helper.isNotEmpty(res)
        return isChecked
    },

    handle(options, config, res) {
        res.options = config;
    },

}








