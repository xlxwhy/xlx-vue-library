

import Helper from "../../helper/Helper.js";
import LoggerFactory from "xlx-vue-common-logger";
import ApiRequest from "../../api/ApiRequest";
import Api from "../../api/Api";
const log = LoggerFactory.newInstance("xlx.vue.common.http.handler.response.AccessTokenExpireHandler")


export default {
    name: "AccessTokenExpireHandler",
    check(options, config, res) {
        let checked = true;
        checked &= Helper.isNotEmpty(options)
        log.info("check not empty: options", checked);
        if (checked) {
            checked &= Helper.isNotEmpty(options.funcIsExpire) && options.funcIsExpire(res)
            log.info("check not empty: options.funcIsExpire", checked);
            checked &= Helper.isNotEmpty(options.funcRefreshTokenApi)
            log.info("check not empty: options.funcRefreshTokenApi", checked);
            checked &= Helper.isNotEmpty(options.funcRefreshTokenPacket)
            log.info("check not empty: options.funcRefreshTokenPacket", checked);
        }
        return checked
    },
    handle(options, config, res) {
        let api = options.funcRefreshTokenApi(config, res);
        let packet = options.funcRefreshTokenPacket(config, res);
        let ignoreOptions = this.ignoreOptions()

        log.info("refresh token api:", api);
        log.info("refresh token packet:", packet);
        log.info("ignore options:", ignoreOptions);

        let apiOptions = Helper.merge({}, config, ignoreOptions)
        return ApiRequest.invoke(api, packet, apiOptions).then((refreshRes) => {
            let token = refreshRes.body.token
            log.info("save new token:", token);
            options.funcSaveToken && options.funcSaveToken(token)
            let testApi = Api.post("/basic/")
            let testPacket = {}
            log.info("test re-invoke api:", testApi);
            log.info("test re-invoke packet:", testPacket);
            log.info("re-invoke again:", config);
            return ApiRequest.invoke({}, {}, apiOptions).then((reInvokeRes) => {
                log.info("re-invoke response:", reInvokeRes);
            }).catch((err) => {
                log.error("re-invoke error:", err);
                res.data = err.data
            }).finally(() => {
                log.end("re-invoke end");
            })
        }).catch((err) => {
            log.error("refresh token error:", err);
            return err
        })
    },

    ignoreOptions() {
        let options = { customConfigHandlerOptions: {} }
        options.customConfigHandlerOptions[this.name] = {
            enable: false
        }
        return options
    }

}

