
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
import AuthorizationHandler from "../handler/config/AuthorizationHandler.js";
import PacketTimestampHandler from "../handler/config/PacketTimestampHandler.js";

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
        AuthorizationHandler,
        PacketTimestampHandler,
    ],
    customConfigHandlerOptions: {},

    customResponseHandlers: [
        OptionsResponseHandler
    ],
    customResponseHandlerOptions: {},
    customErrorHandlers: [
        ApiErrorHandler
    ],
    customErrorHandlerOptions: {

    },

    customLoggerOptions: {
        show: true,
        level: "warn",
    },

})



// ConfigHandlerOptions: PacketPathVariableHandler's options
config.customConfigHandlerOptions[PacketPathVariableHandler.name] = {
    enable: true,
    funcVariablePrefix: () => {
        return ":"
    },
}

// ConfigHandlerOptions: AuthorizationHandler's options
config.customConfigHandlerOptions[AuthorizationHandler.name] = {
    enable: true,
    funcAuthorizationHeaderKey: function () {
        return "Authorization"
    },
    funcAuthorizationSessionKey: function () {
        return this.funcAuthorizationHeaderKey();
    },
    funcAuthorizationValue: function () {
        return sessionStorage[this.funcAuthorizationSessionKey()]+"xxxxx"
    }
}

// ConfigHandlerOptions: PacketPathVariableHandler's options
config.customConfigHandlerOptions[PacketTimestampHandler.name] = {
    enable: false,
    funcMethods: () => {
        return ['get']
    },
    funcTimestampKey: () => {
        return "t"
    },
    funcTimestampValue: () => {
        return new Date().getTime()
    },
}








export default config


