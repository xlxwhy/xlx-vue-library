
import Helper from "../../helper/Helper.js";
import LoggerFactory from "xlx-vue-common-logger";
const log = LoggerFactory.newInstance("xlx.vue.common.http.handle.config.PacketTimestampHandler")
export default {
    name: "PacketTimestampHandler",
    check(options, config) {
        let checked = true;
        checked &= Helper.isNotEmpty(options.funcMethods) && options.funcMethods().indexOf(config.method.toLowerCase()) >= 0
        log.info("check not empty: config.method", checked)
        checked &= Helper.isNotEmpty(options.funcTimestampKey)
        log.info("check not empty: options.funcTimestampKey", checked)
        checked &= Helper.isNotEmpty(options.funcTimestampValue)
        log.info("check not empty: options.funcTimestampValue", checked)
        return checked
    },

    handle(options, config) {
        let params = {}
        params[options.funcTimestampKey()] = options.funcTimestampValue(config)
        Helper.merge(config, { params })
        log.info("handler final config:", config)
        
        return Promise.resolve(config)
    },
}


