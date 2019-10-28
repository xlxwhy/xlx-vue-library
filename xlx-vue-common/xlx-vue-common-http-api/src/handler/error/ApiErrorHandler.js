

import LoggerFactory from "xlx-vue-common-logger";

const log = LoggerFactory.newInstance("xlx.vue.common.http.handler.error.ApiErrorHandlerAuth")


export default {
    name: "api-error-handler",
    check(res) {
        return true
    },
    handle(res) {
        return null;
    },

}

