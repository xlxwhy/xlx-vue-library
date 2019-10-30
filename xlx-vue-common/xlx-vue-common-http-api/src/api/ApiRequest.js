import axios from 'axios'

import ApiConfig from "./ApiConfig.js";
import Helper from "../helper/Helper";
import LoggerFactory from "xlx-vue-common-logger";

// i do not need axios interceptor
// because i can not do something i really need in axios interceptor
// axios.interceptors.request.use(ApiRequestInterceptor.request, ApiRequestInterceptor.error)
// axios.interceptors.response.use(ApiResponseInterceptor.response, ApiResponseInterceptor.error)

const log = LoggerFactory.newInstance("xlx.vue.common.http.api.ApiRequest")
let couter = 0;

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
    async invoke(api, packet, options) {
        let config = Helper.merge({}, ApiConfig, options, api, { packet })
        LoggerFactory.initOptions(config.customLoggerOptions)
        log.start("api request start!")
        log.info("before merge>api:", api)
        log.info("before merge>packet:", packet)
        log.info("before merge>options:", options)
        log.info("before merge>ApiConfig:", ApiConfig)
        log.info("final config:", config)
        await this.handleConfig(config)
        couter++
        if (config.interrupt || couter > 10) {
            return this.interrupt({
                options: config,
                data: config.interruptMessage,
                status: 400,
                statusText: "Interrupt this invoke because some fatal errors. Please check the console informations carefully! ",
            })
        }
        return this.request(config).then(async (res) => {
            log.info("server response:", res)
            await this.handleResponse(config, res)
            let hasError = await this.handleError(config, res)
            if (hasError) {
                log.error("found business error!")
                return Promise.reject(res)
            } else {
                return Promise.resolve(res)
            }
        }).catch(async (err) => {
            log.start("catch error start!", err)
            await this.handleResponse(config, err)
            await this.handleError(config, err)
            log.end("catch error end!", err)
            return Promise.reject(err)
        }).finally(() => {
            log.end("api request end!")
        })
    },

    interrupt(res) {
        return Promise.reject(res)
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


    async doHandlers(handlerField, config, res) {
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
                    await handler.handle(options, config, res)
                    log.info(`handler[${name}] finished!`)
                } else {
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

    async doInvokeHandlers(phase, config, res) {
        let handlers = config.invokeHandlers
        let handlerOptions = config.invokeHandlerOptions
        if (!handlers || handlers.length == 0) {
            log.info(`no invoke handler found!`)
            return false
        }

        let hasHandler = false
        log.start(`invoke ${phase} handler start`)
        for (const handler of handlers) {
            let name = handler.name ? handler.name : "UNKOWN"
            let options = null;
            // check options
            if (handlerOptions) {
                options = handlerOptions[name]
                let disable = Helper.isNotEmpty(options) && Helper.isNotEmpty(options.enable) && !options.enable;
                if (disable) {
                    log.info(`handler [${name}] disable!`)
                    continue;
                }
            }
            // check phase handler
            let phaseName = `${name}.${phase}`
            let phaseHandler = handler[phase]
            if (!phaseHandler) {
                log.info(`${phaseName} not found`)
                continue;
            }
            try {
                if (phaseHandler.check && phaseHandler.check(options, config, res)) {
                    hasHandler = true;
                    await phaseHandler.handle(options, config, res)
                    log.info(`${phaseName} finished`)
                } else {
                    log.info(`${phaseName} check false`)
                }
            } catch (error) {
                
                log.info(`${phaseName} error`)
                log.error(`phase-handler[${name}.${phase}] catch error:${error.message}`)
                console.info(error);
            }
        }
        log.end(`${handlerField} end!`)
        return hasHandler
    },



}


