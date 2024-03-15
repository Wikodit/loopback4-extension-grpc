"use strict";
// Copyright IBM Corp. 2017,2019. All Rights Reserved.
// Node module: @loopback/grpc
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeneratorProvider = void 0;
const tslib_1 = require("tslib");
const context_1 = require("@loopback/context");
const grpc_generator_1 = require("../grpc.generator");
const keys_1 = require("../keys");
/**
 * This provider will return a gRPC TypeScript Generator
 * This can be used to generate typescript files and service declarations
 * from proto files on run time.
 */
let GeneratorProvider = class GeneratorProvider {
    constructor(config) {
        this.config = config;
        this.generator = new grpc_generator_1.GrpcGenerator(config.compilerOptions);
    }
    value() {
        return this.generator;
    }
};
GeneratorProvider = (0, tslib_1.__decorate)([
    (0, tslib_1.__param)(0, (0, context_1.inject)(keys_1.GrpcBindings.CONFIG)),
    (0, tslib_1.__metadata)("design:paramtypes", [Object])
], GeneratorProvider);
exports.GeneratorProvider = GeneratorProvider;
//# sourceMappingURL=generator.provider.js.map