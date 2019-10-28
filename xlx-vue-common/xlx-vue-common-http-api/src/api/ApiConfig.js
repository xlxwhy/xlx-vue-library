
/**
 * base on axios config
 * just want to do five things
 * - change baseURL to base
 * - change params/data to packet{path,query,body}
 * - errorHandlers
 * - log info control
 * - else which will be used in http request or response
 * 
 */


import AxiosConfig from "../axios/AxiosConfig.js";
import BaseUrlHandler from "../handler/config/BaseUrlHandler.js";
import PacketHandler from "../handler/config/PacketHandler.js";
import PacketPathVariableHandler from "../handler/config/PacketPathVariableHandler.js";
import OptionsResponseHandler from "../handler/response/OptionsResponseHandler.js";
import ApiErrorHandler from "../handler/error/ApiErrorHandler.js";

const config = Object.assign({}, AxiosConfig, {
    url: '/',
    method: 'get',
    base: '',
    responseType: 'json',
    timeout: 15000,
    headers: {
        'X-Requested-With': 'XMLHttpRequest'
    },
    packet: {
        path: {},
        query: {},
        body: {}
    },

    customConfigHandlers: [
        BaseUrlHandler,
        PacketHandler,
        PacketPathVariableHandler,
    ],
    customConfigHandlerOptions: {
        pathVariablePrefix: ":"
    },

    customResponseHandlers: [
        OptionsResponseHandler
    ],
    customResponseHandlerOptions: {

    },
    customErrorHandlers: [
        ApiErrorHandler
    ],
    customErrorHandlerOptions: {

    },

    customLoggerOptions: {
        show: true,
        level: "info",
    },

})

export default config


