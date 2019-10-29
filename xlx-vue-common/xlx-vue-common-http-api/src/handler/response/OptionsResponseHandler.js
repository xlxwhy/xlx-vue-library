



import Helper from "../../helper/Helper.js";

export default {
    name: "response-options-handler",
    check(config, res, option) {
        let isChecked = true;
        isChecked = Helper.isNotEmpty(res)
        return isChecked
    },

    handle(config, res, option) {
        res.options = config;
    },

}








