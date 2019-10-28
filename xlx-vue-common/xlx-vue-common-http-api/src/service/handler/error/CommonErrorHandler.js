
import LoggerFactory from "xlx-vue-common-logger";


const log = LoggerFactory.newInstance("library.http.service.handler.error.CommonErrorHandler")


export default {
    name: "common-error-handler",
    check(res, config) { 
        let checked = true;
        checked = (res && res.status && res.status >= 400)
        log.info("check common error :", checked)
        return checked
    },
    handle(res, config) {
        log.info("handle common error start")
        let httpError = null
        let message = null
        if (res) {
            switch (res.status) {
                case 400:
                    message = `请求参数有误`;
                    break;
                case 401:
                    message = `请求的接口未授权`;
                    break;
                case 404:
                    message = `请求的接口不存在`;
                    break;
                case 500:
                    message = `服务端错误`;
                    break;
                case 504:
                    message = `服务端错误`;
                    break;
                default:
                    message = `请求发生错误,请稍候重试`;
                    break;
            }
            httpError = { message, type: "error", code: res.status }
        } else {
            httpError = { message: `请求发生错误,请稍候重试`, type: "error" }
        }
        this.show(httpError)

        log.info("handle common error end:", httpError)
        return httpError
    },
    show(error) {
        if (error) {
            log.info("show>error>", error.message)
        }
    },
}


