"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var settings_1 = __importDefault(require("./settings"));
exports.default = (function (query, variables, operationName, options) {
    return fetch(settings_1.default.url, __assign({}, settings_1.default.fetch, options, { body: JSON.stringify({
            query: query,
            variables: variables,
            operationName: operationName
        }) }))
        .then(function (res) { return res.json(); })
        .then(function (res) { return res.data; });
});
//# sourceMappingURL=gqlFetch.js.map