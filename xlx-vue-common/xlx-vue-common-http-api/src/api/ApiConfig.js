
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
import AccessTokenExpireHandler from "../handler/response/AccessTokenExpireHandler.js";
import InvokeMonitorHandler from "../handler/InvokeMonitorHandler.js";

const config = Object.assign({}, AxiosConfig, {
    url: '/',
    method: 'get',
    base: '',
    responseType: 'json',
    timeout: 15000,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json;charset=UTF-8',
    },
    packet: {
        path: {},
        query: {},
        body: {}
    },

    invokeHandlers: [
        InvokeMonitorHandler,
    ],
    invokeHandlerOptions: {


    },



    customConfigHandlers: [
        BaseUrlHandler,
        PacketHandler,
        PacketPathVariableHandler,
        AuthorizationHandler,
        PacketTimestampHandler,
        InvokeCounterHandler,
    ],
    customConfigHandlerOptions: {},

    customResponseHandlers: [
        OptionsResponseHandler,
        AccessTokenExpireHandler,
    ],
    customResponseHandlerOptions: {},
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



// InvokeHandlerOptions: InvokeMonitorHandler's options
config.invokeHandlerOptions[InvokeMonitorHandler.name] = {
    limit: 10,
}



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
        // return sessionStorage[this.funcAuthorizationSessionKey()]
        return "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJVU0VSSUQiOjExNzcxMTA1NzY1NDA5OTU1ODUsIlVTRVJOQU1FIjoiYWRtaW4iLCJpc3MiOiJXYXBwaW4iLCJhdWQiOiIwOThmNmJjZDQ2MjFkMzczY2FkZTRlODMyNjI3YjRmNiIsImV4cCI6MTU3MjYxMjg1MiwibmJmIjoxNTcyMzUzNjUyfQ.qIDlbOpXzkL7wZhkEGLOGm0eaMU0IqlXe7UQpn5mGBQ"
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

// ConfigHandlerOptions: InvokeCounterHandler's options
config.customConfigHandlerOptions[InvokeCounterHandler.name] = {
    enable: false,
    invokeCounter: 0,
    invokeLimit: 2,
}




// ResponseHandlerOptions: AccessTokenExpireHandler's options
config.customConfigHandlerOptions[AccessTokenExpireHandler.name] = {
    enable: false,
    funcIsExpire: (config, res) => {
        return false
    },
    funcSaveToken: (token) => {
        sessionStorage['API-ACCESS-TOKEN'] = token
    },
    funcRefreshTokenApi: (config, res) => {
        // use the correct api
        return Api.post("/api/token/refresh")
    },
    funcRefreshTokenPacket: (config, res) => {
        return {
            body: {
                access_token: sessionStorage['API-ACCESS-TOKEN'],
                refresh_token: sessionStorage['API-REFRESH-TOKEN'],
            }
        }
    },
}







export default config


