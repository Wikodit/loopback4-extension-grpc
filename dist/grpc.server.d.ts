import { Context } from '@loopback/context';
import { Application, ControllerClass, Server } from '@loopback/core';
import { handleBidiStreamingCall, handleClientStreamingCall, handleServerStreamingCall, handleUnaryCall, Server as PkgGrpcServer } from '@grpc/grpc-js';
import { GrpcGenerator } from './grpc.generator';
import { GrpcComponentConfig } from './types';
/**
 * This Class provides a LoopBack Server implementing gRPC
 */
export declare class GrpcServer extends Context implements Server {
    protected app: Application;
    protected server: PkgGrpcServer;
    protected readonly host: string;
    protected readonly port: string;
    protected generator: GrpcGenerator;
    protected readonly config: GrpcComponentConfig;
    private _listening;
    /**
     * @memberof GrpcServer
     * Creates an instance of GrpcServer.
     *
     * @param app - The application instance (injected via
     * CoreBindings.APPLICATION_INSTANCE).
     * @param server - The actual gRPC Server module (injected via
     * GrpcBindings.GRPC_SERVER).
     * @param options - The configuration options (injected via
     * GRPCBindings.CONFIG).
     *
     */
    constructor(app: Application, server: PkgGrpcServer, host: string, port: string, generator: GrpcGenerator, config: GrpcComponentConfig);
    get listening(): boolean;
    start(): Promise<void>;
    stop(): Promise<void>;
    private _setupControllerMethods;
    /**
     * Set up unary gRPC call
     * @param prototype
     * @param methodName
     */
    setupGrpcUnaryCall<GrpcRequest, GrpcResponse>(ctor: ControllerClass, methodName: string): handleUnaryCall<GrpcRequest, GrpcResponse>;
    /**
     * Set up client streaming gRPC call
     * @param prototype
     * @param methodName
     */
    setupGrpcClientStreamingCall<GrpcRequest, GrpcResponse>(ctor: ControllerClass, methodName: string): handleClientStreamingCall<GrpcRequest, GrpcResponse>;
    /**
     * Set up server streaming gRPC call
     * @param prototype
     * @param methodName
     */
    setupGrpcServerStreamingCall<GrpcRequest, GrpcResponse>(ctor: ControllerClass, methodName: string): handleServerStreamingCall<GrpcRequest, GrpcResponse>;
    /**
     * Set up bidirectional streaming gRPC call
     * @param prototype
     * @param methodName
     */
    setupGrpcBidiStreamingCall<GrpcRequest, GrpcResponse>(ctor: ControllerClass, methodName: string): handleBidiStreamingCall<GrpcRequest, GrpcResponse>;
}
