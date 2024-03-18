"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.protoMetadata = exports.GreeterService = exports.TestResponse = exports.TestRequest = exports.protobufPackage = void 0;
const tslib_1 = require("tslib");
/* eslint-disable */
const ts_proto_descriptors_1 = require("ts-proto-descriptors");
const long_1 = (0, tslib_1.__importDefault)(require("long"));
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
exports.protoMetadata = {
    fileDescriptor: ts_proto_descriptors_1.FileDescriptorProto.fromPartial({
        dependency: [],
        publicDependency: [],
        weakDependency: [],
        messageType: [
            {
                field: [{ name: 'name', number: 1, label: 1, type: 9, jsonName: 'name' }],
                extension: [],
                nestedType: [],
                enumType: [],
                extensionRange: [],
                oneofDecl: [],
                reservedRange: [],
                reservedName: [],
                name: 'TestRequest',
            },
            {
                field: [
                    { name: 'message', number: 1, label: 1, type: 9, jsonName: 'message' },
                ],
                extension: [],
                nestedType: [],
                enumType: [],
                extensionRange: [],
                oneofDecl: [],
                reservedRange: [],
                reservedName: [],
                name: 'TestResponse',
            },
        ],
        enumType: [],
        service: [
            {
                method: [
                    {
                        name: 'UnaryTest',
                        inputType: '.greeterpackage.TestRequest',
                        outputType: '.greeterpackage.TestResponse',
                        options: { uninterpretedOption: [] },
                    },
                    {
                        name: 'ClientStreamTest',
                        inputType: '.greeterpackage.TestRequest',
                        outputType: '.greeterpackage.TestResponse',
                        options: { uninterpretedOption: [] },
                        clientStreaming: true,
                    },
                    {
                        name: 'ServerStreamTest',
                        inputType: '.greeterpackage.TestRequest',
                        outputType: '.greeterpackage.TestResponse',
                        options: { uninterpretedOption: [] },
                        serverStreaming: true,
                    },
                    {
                        name: 'BidiStreamTest',
                        inputType: '.greeterpackage.TestRequest',
                        outputType: '.greeterpackage.TestResponse',
                        options: { uninterpretedOption: [] },
                        clientStreaming: true,
                        serverStreaming: true,
                    },
                ],
                name: 'Greeter',
            },
        ],
        extension: [],
        name: 'greeter.proto',
        package: 'greeterpackage',
        sourceCodeInfo: {
            location: [
                {
                    path: [6, 0, 2, 0],
                    span: [5, 2, 55],
                    leadingDetachedComments: [],
                    leadingComments: ' Sends a greeting\n',
                },
                {
                    path: [4, 0],
                    span: [12, 0, 14, 1],
                    leadingDetachedComments: [],
                    leadingComments: " The request message containing the user's name.\n",
                },
                {
                    path: [4, 1],
                    span: [17, 0, 19, 1],
                    leadingDetachedComments: [],
                    leadingComments: ' The response message containing the greetings\n',
                },
            ],
        },
        syntax: 'proto3',
    }),
    references: {
        '.greeterpackage.TestRequest': exports.TestRequest,
        '.greeterpackage.TestResponse': exports.TestResponse,
    },
    dependencies: [],
};
if (minimal_1.default.util.Long !== long_1.default) {
    minimal_1.default.util.Long = long_1.default;
    minimal_1.default.configure();
}
function isSet(value) {
    return value !== null && value !== undefined;
}
//# sourceMappingURL=greeter.js.map