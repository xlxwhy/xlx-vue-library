


import Helper from "../../helper/Helper.js"; 




export default {
    name:"config-packet-path-variable-handler",
    check(config) {
        let isChecked = true;
        isChecked &= Helper.isNotEmptyField(config, 'packet', 'path') 
        isChecked &= Helper.isNotEmptyField(config, 'customConfigHandlerOptions', 'pathVariablePrefix') 
        if (isChecked) {
            isChecked &= config.url.indexOf(config.customConfigHandlerOptions.pathVariablePrefix) >= 0
        } 
        return isChecked
    },

    handle(config) {
        let url = config.url
        for (let key in config.packet.path) {
            url = url.replace(new RegExp(config.customConfigHandlerOptions.pathVariablePrefix + key, "g"), config.packet.path[key])
        }
        config.url = url
    },
}


