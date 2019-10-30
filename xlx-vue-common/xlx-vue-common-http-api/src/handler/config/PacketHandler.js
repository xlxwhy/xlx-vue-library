



import Helper from "../../helper/Helper.js";

export default {
    name:"config-packet-handler",
    check(options, config) {
        return !Helper.isEmpty(config.packet)
    },

    handle(options, config) {
        if (!Helper.isEmpty(config.packet.query)) {
            config.params = config.packet.query
        }
        if (!Helper.isEmpty(config.packet.body)) {
            config.data = config.packet.body
        }
        
        return Promise.resolve(config)
    },

}








