"use strict";
// Copyright IBM Corp. 2017,2019. All Rights Reserved.
// Node module: @loopback/grpc
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSpecsFromMethodDefinitionAndProtoMetadata = exports.getServiceNameAndMethodNameFromPath = exports.grpc = exports.GRPC_METHODS = void 0;
const metadata_1 = require("@loopback/metadata");
exports.GRPC_METHODS = 'grpc:methods';
/**
 * This decorator provides a way to configure gRPC Micro Services within LoopBack 4
 * @param params
 *
 * @example
 *
 * myproject/controllers/greeter.controller.ts
 * myproject/protos/greeter.proto
 * myproject/protos-ts/greeter.ts
 *
 * Note: greeter.ts is automatically generated from
 * greeter.proto
 *
 * ```ts
 * import {
 *   TestRequest,
 *   TestResponse,
 *   Greeter,
 *   protoMetadata,
 * } from '../protos-ts/greeter';
 *
 * class GreeterCtrl implements Greeter {
 *   // Tell LoopBack that this is a Service RPC implementation
 *   @grpc(protoMetadata.fileDescriptor)
 *   async unaryTest(request: TestRequest): Promise<TestResponse> {
 *     return {
 *       message: 'Hello ' + request.name,
 *     };
 *   }
 * }
 * ```
 */
function grpc(spec) {
    return function (target, propertyKey, descriptor) {
        if (!descriptor.value)
            return;
        const decorator = metadata_1.MethodDecoratorFactory.createDecorator(exports.GRPC_METHODS, spec);
        return decorator(target, propertyKey, descriptor);
    };
}
exports.grpc = grpc;
function getServiceNameAndMethodNameFromPath(path) {
    const splittedPath = path.split('.');
    const splittedServiceAndMethod = splittedPath[splittedPath.length - 1].split('/');
    return {
        METHOD_NAME: splittedServiceAndMethod[1],
        SERVICE_NAME: splittedServiceAndMethod[0],
    };
}
exports.getServiceNameAndMethodNameFromPath = getServiceNameAndMethodNameFromPath;
function getSpecsFromMethodDefinitionAndProtoMetadata(methodDefinition, fileDescriptor) {
    return {
        ...getServiceNameAndMethodNameFromPath(methodDefinition.path),
        REQUEST_STREAM: methodDefinition.requestStream,
        RESPONSE_STREAM: methodDefinition.responseStream,
        PROTO_NAME: fileDescriptor.name,
        PROTO_PACKAGE: fileDescriptor.package,
    };
}
exports.getSpecsFromMethodDefinitionAndProtoMetadata = getSpecsFromMethodDefinitionAndProtoMetadata;
//# sourceMappingURL=grpc.decorator.js.map