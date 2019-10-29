
import ServiceErrors from "../../consts/ServiceErrors.js";
import ServiceConst from "../../consts/ServiceConst"
import LoggerFactory from "xlx-vue-common-logger";
import Helper from "../../helper/Helper.js";
import HandlerHelper from "../../helper/HandlerHelper.js";

const log = LoggerFactory.newInstance("library.http.service.handler.error.AuthErrorHandler")



export default {
    name: "access-token-expire-handler",
    check(config, res, option) {

        
        let checked = false; 
        checked = HandlerHelper.isEnable(config.customResponseHandlerOptions)


        let code = (res && res.data && res.data.header) ? res.data.header.code : null
        let isAuthErrorCode = ServiceConst.ErrorCode.AUTH.indexOf(code) >= 0

        log.info(`check ${this.name}:`, isAuthErrorCode)
        return isAuthErrorCode
    },
    handle(config, res, option) {
        let error = this.getError(res)
        this.show(error)
        log.info(`handler ${this.name} error:`, error)
        return error;
    },

    getError(res) {
        let error = { message: res.data.header.message, type: 'error', code: res.data.header.code };
        if (ServiceErrors[res.data.header.code]) {
            error.message = ServiceErrors[res.data.header.code]
        }
        return error
    },

    show(error) {

    },

}

