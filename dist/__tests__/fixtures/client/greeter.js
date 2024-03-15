"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GreeterClient = exports.GreeterService = exports.TestResponse = exports.TestRequest = exports.protobufPackage = void 0;
const tslib_1 = require("tslib");
/* eslint-disable */
const long_1 = (0, tslib_1.__importDefault)(require("long"));
const grpc_js_1 = require("@grpc/grpc-js");
const minimal_1 = (0, tslib_1.__importDefault)(require("protobufjs/minimal"));
exports.protobufPackage = 'greeterpackage';
function createBaseTestRequest() {
    return { name: '' };
}
exports.TestRequest = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.name !== '') {
            writer.uint32(10).string(message.name);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseTestRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.name = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        return {
            name: isSet(object.name) ? String(object.name) : '',
        };
    },
    toJSON(message) {
        const obj = {};
        message.name !== undefined && (obj.name = message.name);
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseTestRequest();
        message.name = (_a = object.name) !== null && _a !== void 0 ? _a : '';
        return message;
    },
};
function createBaseTestResponse() {
    return { message: '' };
}
exports.TestResponse = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.message !== '') {
            writer.uint32(10).string(message.message);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseTestResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.message = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        return {
            message: isSet(object.message) ? String(object.message) : '',
        };
    },
    toJSON(message) {
        const obj = {};
        message.message !== undefined && (obj.message = message.message);
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseTestResponse();
        message.message = (_a = object.message) !== null && _a !== void 0 ? _a : '';
        return message;
    },
};
exports.GreeterService = {
    /** Sends a greeting */
    unaryTest: {
        path: '/greeterpackage.Greeter/UnaryTest',
        requestStream: false,
        responseStream: false,
        requestSerialize: (value) => Buffer.from(exports.TestRequest.encode(value).finish()),
        requestDeserialize: (value) => exports.TestRequest.decode(value),
        responseSerialize: (value) => Buffer.from(exports.TestResponse.encode(value).finish()),
        responseDeserialize: (value) => exports.TestResponse.decode(value),
    },
    clientStreamTest: {
        path: '/greeterpackage.Greeter/ClientStreamTest',
        requestStream: true,
        responseStream: false,
        requestSerialize: (value) => Buffer.from(exports.TestRequest.encode(value).finish()),
        requestDeserialize: (value) => exports.TestRequest.decode(value),
        responseSerialize: (value) => Buffer.from(exports.TestResponse.encode(value).finish()),
        responseDeserialize: (value) => exports.TestResponse.decode(value),
    },
    serverStreamTest: {
        path: '/greeterpackage.Greeter/ServerStreamTest',
        requestStream: false,
        responseStream: true,
        requestSerialize: (value) => Buffer.from(exports.TestRequest.encode(value).finish()),
        requestDeserialize: (value) => exports.TestRequest.decode(value),
        responseSerialize: (value) => Buffer.from(exports.TestResponse.encode(value).finish()),
        responseDeserialize: (value) => exports.TestResponse.decode(value),
    },
    bidiStreamTest: {
        path: '/greeterpackage.Greeter/BidiStreamTest',
        requestStream: true,
        responseStream: true,
        requestSerialize: (value) => Buffer.from(exports.TestRequest.encode(value).finish()),
        requestDeserialize: (value) => exports.TestRequest.decode(value),
        responseSerialize: (value) => Buffer.from(exports.TestResponse.encode(value).finish()),
        responseDeserialize: (value) => exports.TestResponse.decode(value),
    },
};
exports.GreeterClient = (0, grpc_js_1.makeGenericClientConstructor)(exports.GreeterService, 'greeterpackage.Greeter');
if (minimal_1.default.util.Long !== long_1.default) {
    minimal_1.default.util.Long = long_1.default;
    minimal_1.default.configure();
}
function isSet(value) {
    return value !== null && value !== undefined;
}
//# sourceMappingURL=greeter.js.map