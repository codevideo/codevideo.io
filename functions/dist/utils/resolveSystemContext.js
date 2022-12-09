"use strict";
exports.__esModule = true;
exports.resolveSystemContext = void 0;
var SystemContext_1 = require("../enums/SystemContext");
// go pattern
var resolveSystemContext = function (event) {
    if (event &&
        event.queryStringParameters &&
        event.queryStringParameters["SYSTEM_CONTEXT"] &&
        (event.queryStringParameters["SYSTEM_CONTEXT"] === SystemContext_1.SystemContext.STAGING ||
            event.queryStringParameters["SYSTEM_CONTEXT"] ===
                SystemContext_1.SystemContext.PRODUCTION)) {
        return [event.queryStringParameters["SYSTEM_CONTEXT"], null];
    }
    return [null, new Error("SYSTEM_CONTEXT not set")];
};
exports.resolveSystemContext = resolveSystemContext;
