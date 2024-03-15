import { Provider } from '@loopback/context';
import { Server } from '@grpc/grpc-js';
import { GrpcComponentConfig } from '../types';
/**
 * This provider will creates a gRPC Server
 */
export declare class ServerProvider implements Provider<Server> {
    protected config?: GrpcComponentConfig | undefined;
    private server;
    constructor(config?: GrpcComponentConfig | undefined);
    value(): Server;
}
