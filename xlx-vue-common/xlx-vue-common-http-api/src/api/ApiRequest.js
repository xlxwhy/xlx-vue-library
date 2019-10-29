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
        LoggerFactory.initOptions(config.customLoggerOptions)
        log.start("api request start!")
        log.info("before merge>api:", api)
        log.info("before merge>packet:", packet)
        log.info("before merge>options:", options)
        log.info("before merge>ApiConfig:", ApiConfig)
        log.info("final config:", config)
        this.handleConfig(config)
        return this.request(config).then((res) => {
            log.info("server response:", res)
            this.handleResponse(config, res)
            if (this.handleError(config, res)) {
                log.error("found business error!")
                return Promise.reject(res)
            } else {
                return Promise.resolve(res)
            }
        }).catch((err) => {
            log.start("catch error start!", err)
            this.handleResponse(config, err)
            this.handleError(config, err)
            log.end("catch error end!", err)
            return Promise.reject(err)
        }).finally(() => {
            log.end("api request end!")
        })
    },

    handleConfig(config) {
        return this.doHandlers("customConfigHandlers", config)
    },

    handleResponse(config, res) {
        return this.doHandlers("customResponseHandlers", config, res)
    },

    handleError(config, res) {
        return this.doHandlers("customErrorHandlers", config, res)
    },


    doHandlers(handlerField, config, res) {
        let handlers = config[handlerField]
        if (!handlers || handlers.length == 0) {
            log.info(`no ${handlerField} found!`)
            return false
        }
        let hasHandler = false
        log.start(`${handlerField} start!`)

        let handlerOptionField = handlerField.substring(0, handlerField.length - 1) + "Options"
        let handlersOptions = config[handlerOptionField]
        for (const handler of handlers) {
            let name = handler.name ? handler.name : "UNKOWN"
            let options = null;
            // check options
            if (handlersOptions) {
                options = handlersOptions[name]
                let disable = Helper.isNotEmpty(options) && Helper.isNotEmpty(options.enable) && !options.enable;
                if (disable) {
                    log.warn(`handler[${name}] disable!`)
                    continue;
                }
            }
            // check and handle
            try {
                if (handler.check && handler.check(options, config, res)) {
                    hasHandler = true;
                    handler.handle(options, config, res)
                    log.info(`handler[${name}] finished!`)
                }else{
                    log.warn(`handler[${name}] check false!`)
                }
            } catch (error) {
                log.error(`handler[${name}]: catch error:${error.message}`)
                console.info(error);
            }
        }
        log.end(`${handlerField} end!`)
        return hasHandler
    },

}


