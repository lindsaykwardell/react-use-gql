"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
// @ts-ignore
var graphql_client_1 = require("@jetblack/graphql-client");
var settings_1 = __importDefault(require("./settings"));
exports.default = (function (query, variables, operationName) {
    var _a = react_1.useState(), data = _a[0], setData = _a[1];
    var shutdown = react_1.useRef(function () { return null; });
    react_1.useEffect(function () {
        shutdown.current = graphql_client_1.graphQLSubscriber(settings_1.default.subUrl, settings_1.default.options, function (error, subscribe) {
            if (!(error || subscribe)) {
                // Normal closure.
                return;
            }
            if (error) {
                console.error(error);
                throw error;
            }
            subscribe(query, variables, operationName, function (error, data) {
                if (!(error || subscribe)) {
                    // Normal closure
                    return;
                }
                if (error) {
                    console.error(error);
                    throw error;
                }
                setData(data);
            });
        });
        return function () {
            shutdown.current();
        };
    }, []);
    return data;
});
//# sourceMappingURL=useSub.js.map