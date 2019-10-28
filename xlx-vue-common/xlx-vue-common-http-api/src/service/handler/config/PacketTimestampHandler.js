
import Helper from "../../../helper/Helper.js";
import LoggerFactory from "xlx-vue-common-logger";
const log = LoggerFactory.newInstance("library.http.service.handler.config.PacketTimestampHandler")

export default {
    name: "config-packet-timestamp-handler",
    check(config) {
        let isGetMethod = config.method.toLowerCase() == "get";

        log.info(`check ${this.name}:`, isGetMethod)
        return isGetMethod
    },

    handle(config) {
        let params = { t: new Date().getTime() }
        Helper.merge(config, { params })

        log.info(`handler ${this.name} :`, config)
    },
}


