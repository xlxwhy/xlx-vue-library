



import Helper from "../../helper/Helper.js";

export default {
    name:"config-packet-handler",
    check(config) {
        return !Helper.isEmpty(config.packet)
    },

    handle(config) {
        if (!Helper.isEmpty(config.packet.query)) {
            config.params = config.packet.query
        }
        if (!Helper.isEmpty(config.packet.body)) {
            config.data = config.packet.body
        }
    },

}








