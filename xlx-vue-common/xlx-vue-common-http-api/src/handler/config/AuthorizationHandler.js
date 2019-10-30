

import Helper from "../../helper/Helper.js";
import LoggerFactory from "xlx-vue-common-logger";
const log = LoggerFactory.newInstance("xlx.vue.common.http.handle.config.AuthorizationHandler")

export default {
    name: "AuthorizationHandler",
    check(options, config) {
        let checked = true;
        checked &= Helper.isNotEmpty(options.funcAuthorizationValue)
        log.info("check not empty: options.funcAuthorizationValue", checked)
        checked &= Helper.isNotEmpty(options.funcAuthorizationHeaderKey)
        log.info("check not empty: options.funcAuthorizationHeaderKey", checked)
        return checked
    },

    handle(options, config) {
        let headers = {}
        headers[options.funcAuthorizationHeaderKey(config)] = options.funcAuthorizationValue(config)
        log.info("authorization headers:", headers)
        Helper.merge(config, { headers })
        log.info("handler final config:", config)
        return Promise.resolve(config)
    },
}


