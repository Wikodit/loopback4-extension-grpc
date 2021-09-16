"use strict";
// Copyright IBM Corp. 2017,2019. All Rights Reserved.
// Node module: @loopback/grpc
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerProvider = void 0;
const grpc_js_1 = require("@grpc/grpc-js");
/**
 * This provider will creates a gRPC Server
 */
class ServerProvider {
    constructor() {
        this.server = new grpc_js_1.Server();
    }
    value() {
        return this.server;
    }
}
exports.ServerProvider = ServerProvider;
//# sourceMappingURL=server.provider.js.map