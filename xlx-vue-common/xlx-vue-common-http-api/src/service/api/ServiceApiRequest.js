



/**
 * just one thing i want to do here
 * - use my own config where requesting data
 */


import ApiRequest from '../../api/ApiRequest.js'
import Helper from '../../helper/Helper.js'
import ServiceApiConfig from "./ServiceApiConfig.js";
import LoggerFactory from "xlx-vue-common-logger";
const log = LoggerFactory.newInstance("xlx.vue.common.http.service.api.ServiceApiRequest")


export default {
    invoke(api, packet, options) {
        log.start("service api request start!")
        log.info("before merge>api:", api)
        log.info("before merge>packet:", packet)
        log.info("before merge>options:", options)
        let config = Helper.merge({}, ServiceApiConfig, options)
        log.info("after merge>config:", config)
        return ApiRequest.invoke(api, packet, config).then(res => { 
            log.info("ApiRequest invoke response:", res)
            return Promise.resolve(res)
        }).catch((err) => {
            log.error("catch something wrong:", err)
            return Promise.reject(err)
        }).finally(() => {
            log.end("service api request end!")
        })
    },

}



