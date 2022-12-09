"use strict";
exports.__esModule = true;
exports.validateBodyParams = void 0;
// go pattern
var validateBodyParams = function (body, params) {
    for (var _i = 0, params_1 = params; _i < params_1.length; _i++) {
        var param = params_1[_i];
        if (body[param] === null || body[param] === undefined) {
            return new Error("Missing required parameter ".concat(String(param), " is null or undefined"));
        }
    }
    return null;
};
exports.validateBodyParams = validateBodyParams;
