
import ServiceErrors from "../../consts/ServiceErrors.js";
import ServiceConst from "../../consts/ServiceConst"
import LoggerFactory from "xlx-vue-common-logger";

const log = LoggerFactory.newInstance("library.http.service.handler.error.AuthErrorHandler")

 

export default {
    name:"auth-error-handler",
    check(res) {
        let code = (res && res.data && res.data.header) ? res.data.header.code : null
        let isAuthErrorCode = ServiceConst.ErrorCode.AUTH.indexOf(code) >= 0
        
        log.info(`check ${this.name}:`, isAuthErrorCode)
        return isAuthErrorCode
    },
    handle(res) {
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

