
import LoggerFactory from "xlx-vue-common-logger";
import Helper from "./Helper";

const log = LoggerFactory.newInstance("xlx.vue.common.http.helper.Helper")


export default {
    isEnable(handlerOptions) {
        return Helper.isNotEmpty(handlerOptions.enable) && !handlerOptions.enable;
    },

}