"use strict";
// Copyright IBM Corp. 2017,2019. All Rights Reserved.
// Node module: @loopback/grpc
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerProvider = void 0;
const tslib_1 = require("tslib");
const context_1 = require("@loopback/context");
const grpc_js_1 = require("@grpc/grpc-js");
const keys_1 = require("../keys");
/**
 * This provider will creates a gRPC Server
 */
let ServerProvider = class ServerProvider {
    constructor(config) {
        var _a;
        this.config = config;
        this.server = new grpc_js_1.Server((_a = config === null || config === void 0 ? void 0 : config.server) === null || _a === void 0 ? void 0 : _a.options);
    }
    value() {
        return this.server;
    }
};
ServerProvider = (0, tslib_1.__decorate)([
    (0, tslib_1.__param)(0, (0, context_1.inject)(keys_1.GrpcBindings.CONFIG)),
    (0, tslib_1.__metadata)("design:paramtypes", [Object])
], ServerProvider);
exports.ServerProvider = ServerProvider;
//# sourceMappingURL=server.provider.js.map