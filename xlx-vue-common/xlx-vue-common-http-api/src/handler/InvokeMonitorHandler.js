

import Helper from "../helper/Helper.js";
import LoggerFactory from "xlx-vue-common-logger";
const log = LoggerFactory.newInstance("xlx.vue.common.http.handle.InvokeMonitorHandler")

const InvokeMonitor = {

}

export default {
    name: "InvokeMonitorHandler",

    config: {
        check(options, config) {
            return true
        },

        handle(options, config) {
            // checked 
            let counter = InvokeMonitor[config.url] ? InvokeMonitor[config.url] : 0
            let limit = config.invokeLimit ? config.invokeLimit : 10
            let exceed = counter > limit
            // exceed
            if (!exceed) {
                InvokeMonitor[url] = counter + 1
                config.interrupt = true;
                config.interruptMessage = `Too many requests [${config.url}]!`;
                log.error(config.interruptMessage)
            }
            return Promise.resolve(config)
        },
    },
    response: {},
    error: {},
    finally: {
        check(options, config, res) {
            return true
        },

        handle(options, config, res) {
            let counter = InvokeMonitor[config.url] ? InvokeMonitor[config.url] : 0
            InvokeMonitor[url] = counter < 1 ? 0 : counter - 1
        },
    }

}

