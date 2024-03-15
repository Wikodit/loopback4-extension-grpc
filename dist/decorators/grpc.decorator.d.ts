import { FileDescriptorProto } from 'ts-proto-descriptors';
import { GrpcMethodMetadata } from '../types';
import { MethodDefinition } from '@grpc/proto-loader';
import { handleAsyncBidiStreamingCall, handleAsyncClientStreamingCall, handleAsyncServerStreamingCall, handleAsyncUnaryCall } from '../types';
export declare const GRPC_METHODS = "grpc:methods";
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
export declare function grpc(spec: GrpcMethodMetadata): <GrpcRequest, GrpcResponse, AsyncUnaryCall extends handleAsyncUnaryCall<GrpcRequest, GrpcResponse>, AsyncClientStreamingCall extends handleAsyncClientStreamingCall<GrpcRequest, GrpcResponse>, AsyncServerStreamingCall extends handleAsyncServerStreamingCall<GrpcRequest, GrpcResponse>, AsyncBidiStreamingCall extends handleAsyncBidiStreamingCall<GrpcRequest, GrpcResponse>, T extends TypedPropertyDescriptor<AsyncUnaryCall> | TypedPropertyDescriptor<AsyncClientStreamingCall> | TypedPropertyDescriptor<AsyncServerStreamingCall> | TypedPropertyDescriptor<AsyncBidiStreamingCall>>(target: Object, propertyKey: string | symbol, descriptor: T extends TypedPropertyDescriptor<infer F> ? F extends AsyncUnaryCall ? TypedPropertyDescriptor<handleAsyncUnaryCall<GrpcRequest, GrpcResponse>> : F extends AsyncClientStreamingCall ? TypedPropertyDescriptor<handleAsyncClientStreamingCall<GrpcRequest, GrpcResponse>> : F extends AsyncServerStreamingCall ? TypedPropertyDescriptor<handleAsyncServerStreamingCall<GrpcRequest, GrpcResponse>> : TypedPropertyDescriptor<handleAsyncBidiStreamingCall<GrpcRequest, GrpcResponse>> : T) => void | (T extends TypedPropertyDescriptor<infer F_1> ? F_1 extends AsyncUnaryCall ? TypedPropertyDescriptor<handleAsyncUnaryCall<GrpcRequest, GrpcResponse>> : F_1 extends AsyncClientStreamingCall ? TypedPropertyDescriptor<handleAsyncClientStreamingCall<GrpcRequest, GrpcResponse>> : F_1 extends AsyncServerStreamingCall ? TypedPropertyDescriptor<handleAsyncServerStreamingCall<GrpcRequest, GrpcResponse>> : TypedPropertyDescriptor<handleAsyncBidiStreamingCall<GrpcRequest, GrpcResponse>> : T);
export declare function getServiceNameAndMethodNameFromPath(path: string): {
    METHOD_NAME: string;
    SERVICE_NAME: string;
};
export declare function getSpecsFromMethodDefinitionAndProtoMetadata(methodDefinition: Omit<MethodDefinition<any, any>, 'originalName' | 'requestType' | 'responseType'>, fileDescriptor: FileDescriptorProto): GrpcMethodMetadata;
