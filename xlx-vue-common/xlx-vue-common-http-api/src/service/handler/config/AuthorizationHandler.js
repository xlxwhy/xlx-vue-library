

import Helper from "../../../helper/Helper.js";
import LoggerFactory from "xlx-vue-common-logger";

const log = LoggerFactory.newInstance("library.http.service.handler.config.AuthorizationHandler")

export default {
    name:"authorization-handler",
    check(options, config) {
        
        let isChecked = true;
        isChecked &= Helper.isNotEmpty(config.funcAuthorizationValue)
        isChecked &= Helper.isNotEmpty(config.authorizationHeaderKey) 
        
        log.info(`check ${this.name}:`, isChecked)
        return isChecked
    },

    handle(options, config) {
        console.log(options,config);
        
        let headers = {}
        headers[config.authorizationHeaderKey] = config.funcAuthorizationValue(config) + "xx" 
        Helper.merge(config, { headers }) 
        
        log.info(`handler ${this.name} :`, config)
        return config
    },
}


