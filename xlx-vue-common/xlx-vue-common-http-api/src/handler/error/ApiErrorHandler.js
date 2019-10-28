

import LoggerFactory from "xlx-vue-common-logger";

const log = LoggerFactory.newInstance("xlx.vue.common.http.handler.error.ApiErrorHandlerAuth")


export default {
    name: "api-error-handler",
    check(res) {
        log.info(`check ${name}:`, true)
        return true
    },
    handle(res) {
        log.info(`handler ${name}:`, "finished")
        return null;
    },

}

