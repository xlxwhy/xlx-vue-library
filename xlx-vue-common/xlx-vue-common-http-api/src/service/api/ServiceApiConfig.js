

// base on ApiConfig.js
// differences: 
//   - base/baseURL, 
//   - packet/data/params

import PacketTimestampHandler from "../handler/config/PacketTimestampHandler";
import AuthorizationHandler from "../handler/config/AuthorizationHandler";
import AuthErrorHandler from "../handler/error/AuthErrorHandler";
import BusinessErrorHandler from "../handler/error/BusinessErrorHandler";
import CommonErrorHandler from "../handler/error/CommonErrorHandler";

const config = {
    base: "/",
    customConfigHandlers: [
        PacketTimestampHandler,
        AuthorizationHandler,
    ],
    customErrorHandlers: [
        AuthErrorHandler,
        BusinessErrorHandler,
        CommonErrorHandler
    ],
}

export default config


