import axios from 'axios'

import ApiConfig from "./ApiConfig.js";
import Helper from "../helper/Helper";
import LoggerFactory from "xlx-vue-common-logger";

// i do not need axios interceptor
// because i can not do something i really need in axios interceptor
// axios.interceptors.request.use(ApiRequestInterceptor.request, ApiRequestInterceptor.error)
// axios.interceptors.response.use(ApiResponseInterceptor.response, ApiResponseInterceptor.error)

const log = LoggerFactory.newInstance("xlx.vue.common.http.api.ApiRequest")

export default {


    // just one thing i want to do here
    // - in catch block, response the same object[err.response] with then block
    request(options) {
        log.start("axios request start!") 
        log.info("axios options", options)
        return axios(options).then((res) => {
            log.info("axios response", res)
            return Promise.resolve(res)
        }).catch((err) => {
            log.error("found some error:", err.response)
            return Promise.reject(err.response)
        }).finally(() => {
            log.end("axios request end!")
        })
    },
    // just three things i want to do here
    // - invoke config handlers
    // - invoke reponse handlers
    // - invoke error handlers
    invoke(api, packet, options) {
        let config = Helper.merge({}, ApiConfig, options, api, { packet })
        log.init(config.customLoggerOptions)
        log.start("api request start!")
        log.info("before merge>api:", api)
        log.info("before merge>packet:", packet)
        log.info("before merge>options:", options)
        log.info("before merge>ApiConfig:", ApiConfig)
        log.info("final config:", config)
        this.handleConfig(config)
        return this.request(config).then((res) => {
            log.info("server response:", res)
            this.handleResponse(res, config)
            if (this.handleError(res, config)) {
                log.error("found business error!")
                return Promise.reject(res)
            } else {
                return Promise.resolve(res)
            }
        }).catch((err) => {
            log.start("catch error start!", err)
            this.handleResponse(err, config)
            this.handleError(err, config)
            log.end("catch error end!", err)
            return Promise.reject(err)
        }).finally(() => { 
            log.end("api request end!")
        })
    },

    handleConfig(config) {
        log.start("before handle config:", config)
        let handlers = config.customConfigHandlers
        let handlerConfig = config.customConfigHandlerOptions
        if (!handlers || handlers.length == 0) {
            log.info("no config handlers")
            log.tabOut()
            return
        }
        for (const handler of handlers) {
            if (handler.check && handler.check(config)) {
                let name = handler.name ? handler.name : "UNKOWN"
                handler.handle(config)
                log.info("handler [" + name + "] finished")
            }
        }
        log.end("after handle config:", config)
    },

    handleResponse(res, config) {
        log.start("before handle response:", res)
        let handlers = config.customResponseHandlers
        let handlerConfig = config.customResponseHandlerOptions
        if (!handlers || handlers.length == 0) {
            log.end("no response handlers") 
            return
        }
        for (const handler of handlers) {
            if (handler.check && handler.check(res, config)) {
                let name = handler.name ? handler.name : "UNKOWN"
                handler.handle(res, config)
                log.info("handler [" + name + "] finished")
            }
        }
        log.end("after handle response:", res)
    },

    handleError(res, config) {
        log.start("before handle errors:", res)
        let handlers = config.customErrorHandlers
        let handlerConfig = config.customErrorHandlerOptions
        if (!handlers || handlers.length == 0) {
            log.end("no error handlers") 
            return
        }
        let hasError = false;

        for (const handler of handlers) {
            if (handler.check && handler.check(res)) {
                let name = handler.name ? handler.name : "UNKOWN"
                if (handler.handle(res)) {
                    hasError = true
                }
                log.error("handler [" + name + "] finished")
            }
        }
        log.end("after handle errors:", res)
        return hasError
    },

}


