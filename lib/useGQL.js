"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var gqlFetch_1 = __importDefault(require("./gqlFetch"));
exports.default = (function (query, wait, variables, operationName, options) {
    var _a = react_1.useState(), results = _a[0], setResults = _a[1];
    var _b = react_1.useState(wait !== null ? wait : false), disabled = _b[0], toggleDisabled = _b[1];
    var _c = react_1.useState(0), num = _c[0], setNum = _c[1];
    var runQuery = function () { return setNum(num + 1); };
    react_1.useEffect(function () {
        if (num > 0)
            gqlFetch_1.default(query, variables, operationName, options).then(function (data) {
                return setResults(data);
            });
    }, [num]);
    react_1.useEffect(function () {
        if (!disabled)
            setNum(num + 1);
    }, [query, disabled, variables, operationName, options]);
    return [results, runQuery];
});
//# sourceMappingURL=useGQL.js.map