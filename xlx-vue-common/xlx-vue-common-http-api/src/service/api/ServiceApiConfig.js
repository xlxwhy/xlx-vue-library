

// base on ApiConfig.js
// differences: 
//   - base/baseURL, 
//   - packet/data/params

import PacketTimestampHandler from "../handler/config/PacketTimestampHandler"; 
import AuthErrorHandler from "../handler/error/AuthErrorHandler";
import BusinessErrorHandler from "../handler/error/BusinessErrorHandler";
import CommonErrorHandler from "../handler/error/CommonErrorHandler";

const config = {
    base: "/",
    customConfigHandlers: [
    ],
    customErrorHandlers: [
        AuthErrorHandler,
        BusinessErrorHandler,
        CommonErrorHandler
    ],
}

export default config


