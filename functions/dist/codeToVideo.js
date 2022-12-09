"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.handler = void 0;
var resolveSystemContext_1 = require("./utils/resolveSystemContext");
var validateBodyParams_1 = require("./utils/validateBodyParams");
var handler = function (event) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, systemContext, systemContextErr, json, validationErr, response, responseJson;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = (0, resolveSystemContext_1.resolveSystemContext)(event), systemContext = _a[0], systemContextErr = _a[1];
                if (systemContextErr !== null) {
                    return [2 /*return*/, {
                            statusCode: 400,
                            body: JSON.stringify(systemContextErr)
                        }];
                }
                if (event.body === null) {
                    return [2 /*return*/, {
                            statusCode: 400,
                            body: "event.body is null"
                        }];
                }
                json = JSON.parse(event.body);
                validationErr = (0, validateBodyParams_1.validateBodyParams)(json, ["filename", "code"]);
                if (validationErr !== null) {
                    return [2 /*return*/, {
                            statusCode: 400,
                            body: JSON.stringify(validationErr)
                        }];
                }
                return [4 /*yield*/, fetch("https://ler2xyky6k.execute-api.us-east-1.amazonaws.com/stage/", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            filename: json.filename,
                            code: json.code,
                            saveToBucket: true,
                            apiKey: process.env.API_KEY
                        })
                    })];
            case 1:
                response = _b.sent();
                return [4 /*yield*/, response.json()];
            case 2:
                responseJson = _b.sent();
                return [2 /*return*/, {
                        statusCode: 200,
                        body: JSON.stringify({ videoUrl: responseJson.videoUrl })
                    }];
        }
    });
}); };
exports.handler = handler;
