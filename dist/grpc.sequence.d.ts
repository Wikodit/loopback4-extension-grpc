import { ServerDuplexStream, ServerReadableStream, ServerUnaryCall, ServerWritableStream } from '@grpc/grpc-js';
import BaseController from './grpc.controller';
/**
 * Interface that describes a gRPC Sequence
 */
export interface GrpcSequenceInterface {
    /**
     * Call controller method to handle server streaming call
     * The controller method should never have anything
     * executed after callback call
     * If the method throws, the error is catched in grpc.server
     * and send as an error through gRPC protocol
     * @param call
     * @returns
     */
    unaryCall<GrpcRequest, GrpcResponse>(call: ServerUnaryCall<GrpcRequest, GrpcResponse>): Promise<GrpcResponse>;
    /**
     * Call controller method to handle client streaming call
     * The controller method should never have anything
     * executed after callback call
     * If the method throws, the error is catched in grpc.server
     * and send as an error through gRPC protocol
     * @param call
     * @returns
     */
    clientStreamingCall<GrpcRequest, GrpcResponse>(call: ServerReadableStream<GrpcRequest, GrpcResponse>): Promise<GrpcResponse>;
    /**
     * Call controller method to handle server streaming call
     * The controller method promise should resolve
     * when all call.write have been executed
     * If the method throws, the error is catched in grpc.server
     * and send as an error through gRPC protocol
     * @param call
     * @returns
     */
    serverStreamingCall<GrpcRequest, GrpcResponse>(call: ServerWritableStream<GrpcRequest, GrpcResponse>): Promise<void>;
    /**
     * Call controller method to handle bidirectional streaming call
     * The controller method promise should resolve
     * when all call.write have been executed
     * If the method throws, the error is catched in grpc.server
     * and send as an error through gRPC protocol
     * @param call
     * @returns
     */
    bidiStreamingCall<GrpcRequest, GrpcResponse>(call: ServerDuplexStream<GrpcRequest, GrpcResponse>): Promise<void>;
}
/**
 * gRPC Sequence
 */
export declare class GrpcSequence implements GrpcSequenceInterface {
    protected controller: BaseController;
    protected method: string;
    constructor(controller: BaseController, method: string);
    /**
     * Call controller method to handle unary call
     * The controller method should never have anything
     * executed after callback call
     * If the method throws, the error is catched in grpc.server
     * and send as an error through gRPC protocol
     * @param call
     * @returns
     */
    unaryCall<GrpcRequest, GrpcResponse>(call: ServerUnaryCall<GrpcRequest, GrpcResponse>): Promise<GrpcResponse>;
    /**
     * Call controller method to handle client streaming call
     * The controller method should never have anything
     * executed after callback call
     * If the method throws, the error is catched in grpc.server
     * and send as an error through gRPC protocol
     * @param call
     * @returns
     */
    clientStreamingCall<GrpcRequest, GrpcResponse>(call: ServerReadableStream<GrpcRequest, GrpcResponse>): Promise<GrpcResponse>;
    /**
     * Call controller method to handle server streaming call
     * The controller method promise should resolve
     * when all call.write have been executed
     * If the method throws, the error is catched in grpc.server
     * and send as an error through gRPC protocol
     * @param call
     * @returns
     */
    serverStreamingCall<GrpcRequest, GrpcResponse>(call: ServerWritableStream<GrpcRequest, GrpcResponse>): Promise<void>;
    /**
     * Call controller method to handle bidirectional streaming call
     * The controller method promise should resolve
     * when all call.write have been executed
     * If the method throws, the error is catched in grpc.server
     * and send as an error through gRPC protocol
     * @param call
     * @returns
     */
    bidiStreamingCall<GrpcRequest, GrpcResponse>(call: ServerDuplexStream<GrpcRequest, GrpcResponse>): Promise<void>;
}
