"use strict";
// Copyright IBM Corp. 2017,2019. All Rights Reserved.
// Node module: @loopback/grpc
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.GrpcBindings = void 0;
const context_1 = require("@loopback/context");
const core_1 = require("@loopback/core");
/**
 * Binding keys used by this component.
 */
var GrpcBindings;
(function (GrpcBindings) {
    GrpcBindings.GRPC_SERVER = context_1.BindingKey.create('grpc.server');
    GrpcBindings.GRPC_SEQUENCE = context_1.BindingKey.create('grpc.sequence');
    GrpcBindings.GRPC_CONTROLLER = 'grpc.controller';
    GrpcBindings.GRPC_METHOD = 'grpc.method';
    GrpcBindings.GRPC_METHOD_NAME = context_1.BindingKey.create('grpc.method.name');
    GrpcBindings.GRPC_GENERATOR = 'grpc.generator';
    GrpcBindings.CONTEXT = context_1.BindingKey.create('grpc.context');
    GrpcBindings.HOST = context_1.BindingKey.create('grpc.host');
    GrpcBindings.PORT = context_1.BindingKey.create('grpc.port');
    GrpcBindings.CONFIG = `${core_1.CoreBindings.APPLICATION_CONFIG}#grpc`;
})(GrpcBindings = exports.GrpcBindings || (exports.GrpcBindings = {}));
//# sourceMappingURL=keys.js.map