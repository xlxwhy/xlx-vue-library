

import LoggerFactory from "xlx-vue-common-logger";

const log = LoggerFactory.newInstance("xlx.vue.common.http.handler.error.ApiErrorHandlerAuth")


export default {
    name: "api-error-handler",
    check(options, config, res) {
        return true
    },
    handle(options, config, res) {
        return null;
    },

}

