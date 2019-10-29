


import Helper from "../../helper/Helper.js";
import LoggerFactory from "xlx-vue-common-logger";
const log = LoggerFactory.newInstance("xlx.vue.common.http.handle.config.PacketPathVariableHandler")



export default {
    name: "PacketPathVariableHandler",
    check(options, config) {
        let checked = true;
        checked &= Helper.isNotEmptyField(config, 'packet', 'path')
        log.info("check not empty: config.packet.path", checked)
        checked &= Helper.isNotEmpty(options.funcVariablePrefix) && Helper.isNotEmpty(options.funcVariablePrefix())
        log.info("check not empty: options.funcVariablePrefix", checked)
        if (checked) {
            checked &= config.url.indexOf(options.funcVariablePrefix()) >= 0
            log.info("check has path variable: config.url", checked)
        }
        return checked
    },

    handle(options, config) {
        let url = config.url
        for (let key in config.packet.path) {
            url = url.replace(new RegExp(options.funcVariablePrefix() + key, "g"), config.packet.path[key])
        }
        config.url = url
    },
}


