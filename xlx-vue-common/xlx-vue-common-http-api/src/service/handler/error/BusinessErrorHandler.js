
import ServiceErrors from "../../consts/ServiceErrors";
import ServiceConst from "../../consts/ServiceConst"
import LoggerFactory from "xlx-vue-common-logger";
const log = LoggerFactory.newInstance("library.http.service.handler.error.BusinessErrorHandler")

export default {
    name: "business-error-handler",
    check(options, config, res) {
        let code = (res && res.data && res.data.header) ? res.data.header.code : null
        let isAuthErrorCode = ServiceConst.ErrorCode.AUTH.indexOf(code) >= 0
        let isSuccessCode = ServiceConst.ErrorCode.SUCCESS.indexOf(code) >= 0
        let isBusinessErrorCode = code && !isSuccessCode && !isAuthErrorCode
        log.info(`check ${this.name}:`, isBusinessErrorCode)
        return isBusinessErrorCode
    },
    handle(options, config, res) {
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



