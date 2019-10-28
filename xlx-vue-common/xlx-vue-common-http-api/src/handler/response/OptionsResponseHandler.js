



import Helper from "../../helper/Helper.js";

export default {
    name: "response-options-handler",
    check(res, config) {
        let isChecked = true;
        isChecked = Helper.isNotEmpty(res)
        return isChecked
    },

    handle(res, config) {
        res.options = config;
    },

}








