"use strict";
// Copyright IBM Corp. 2017,2019. All Rights Reserved.
// Node module: @loopback/grpc
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.GrpcSequence = void 0;
const tslib_1 = require("tslib");
const context_1 = require("@loopback/context");
const keys_1 = require("./keys");
const debug_1 = (0, tslib_1.__importDefault)(require("debug"));
const grpc_controller_1 = (0, tslib_1.__importDefault)(require("./grpc.controller"));
const debug = (0, debug_1.default)('loopback:grpc:calls');
/**
 * gRPC Sequence
 */
let GrpcSequence = class GrpcSequence {
    constructor(controller, method) {
        this.controller = controller;
        this.method = method;
    }
    /**
     * Call controller method to handle unary call
     * The controller method should never have anything
     * executed after callback call
     * If the method throws, the error is catched in grpc.server
     * and send as an error through gRPC protocol
     * @param call
     * @returns
     */
    unaryCall(call) {
        debug('Calling %s.%s', this.controller.constructor.name, this.method, call.request);
        return new Promise((resolve, reject) => {
            const c = this.controller[this.method](call, (err, value) => {
                if (err || !value) {
                    reject(err);
                    return;
                }
                resolve(value);
            });
            if (c)
                c.catch((e) => reject(e));
        });
    }
    /**
     * Call controller method to handle client streaming call
     * The controller method should never have anything
     * executed after callback call
     * If the method throws, the error is catched in grpc.server
     * and send as an error through gRPC protocol
     * @param call
     * @returns
     */
    clientStreamingCall(call) {
        debug('Calling %s.%s', this.controller.constructor.name, this.method);
        return new Promise((resolve, reject) => {
            const c = this.controller[this.method](call, (err, value) => {
                if (err || !value) {
                    reject(err);
                    return;
                }
                resolve(value);
            });
            if (c)
                c.catch((e) => reject(e));
        });
    }
    /**
     * Call controller method to handle server streaming call
     * The controller method promise should resolve
     * when all call.write have been executed
     * If the method throws, the error is catched in grpc.server
     * and send as an error through gRPC protocol
     * @param call
     * @returns
     */
    async serverStreamingCall(call) {
        debug('Calling %s.%s', this.controller.constructor.name, this.method, call.request);
        await this.controller[this.method](call);
    }
    /**
     * Call controller method to handle bidirectional streaming call
     * The controller method promise should resolve
     * when all call.write have been executed
     * If the method throws, the error is catched in grpc.server
     * and send as an error through gRPC protocol
     * @param call
     * @returns
     */
    async bidiStreamingCall(call) {
        debug('Calling %s.%s', this.controller.constructor.name, this.method);
        await this.controller[this.method](call);
    }
};
GrpcSequence = (0, tslib_1.__decorate)([
    (0, tslib_1.__param)(0, (0, context_1.inject)(keys_1.GrpcBindings.GRPC_CONTROLLER)),
    (0, tslib_1.__param)(1, (0, context_1.inject)(keys_1.GrpcBindings.GRPC_METHOD_NAME)),
    (0, tslib_1.__metadata)("design:paramtypes", [grpc_controller_1.default, String])
], GrpcSequence);
exports.GrpcSequence = GrpcSequence;
//# sourceMappingURL=grpc.sequence.js.map