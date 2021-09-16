"use strict";
// Copyright IBM Corp. 2017,2019. All Rights Reserved.
// Node module: @loopback/grpc
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.GrpcComponent = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const context_1 = require("@loopback/context");
const keys_1 = require("./keys");
const server_provider_1 = require("./providers/server.provider");
const grpc_server_1 = require("./grpc.server");
const grpc_sequence_1 = require("./grpc.sequence");
const generator_provider_1 = require("./providers/generator.provider");
/**
 * Grpc Component for LoopBack 4.
 */
let GrpcComponent = class GrpcComponent {
    constructor(app, config) {
        var _a, _b;
        /**
         * Export GrpcProviders
         */
        this.providers = {
            [keys_1.GrpcBindings.GRPC_SERVER.toString()]: server_provider_1.ServerProvider,
            [keys_1.GrpcBindings.GRPC_GENERATOR]: generator_provider_1.GeneratorProvider,
        };
        /**
         * Export Grpc Server
         */
        this.servers = {
            GrpcServer: grpc_server_1.GrpcServer,
        };
        // Set default configuration for this component
        const serverConfig = Object.assign({
            host: '0.0.0.0',
            port: 3000,
        }, (_a = config.server) !== null && _a !== void 0 ? _a : {});
        // Bind host, port, proto path, package and sequence
        app.bind(keys_1.GrpcBindings.HOST).to(serverConfig.host);
        app.bind(keys_1.GrpcBindings.PORT).to(serverConfig.port);
        app
            .bind(keys_1.GrpcBindings.GRPC_SEQUENCE)
            .toClass((_b = config.sequence) !== null && _b !== void 0 ? _b : grpc_sequence_1.GrpcSequence);
    }
};
GrpcComponent = (0, tslib_1.__decorate)([
    (0, tslib_1.__param)(0, (0, context_1.inject)(core_1.CoreBindings.APPLICATION_INSTANCE)),
    (0, tslib_1.__param)(1, (0, context_1.inject)(keys_1.GrpcBindings.CONFIG)),
    (0, tslib_1.__metadata)("design:paramtypes", [core_1.Application, Object])
], GrpcComponent);
exports.GrpcComponent = GrpcComponent;
//# sourceMappingURL=grpc.component.js.map