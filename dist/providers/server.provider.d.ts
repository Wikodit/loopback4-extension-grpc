import { Provider } from '@loopback/context';
import { Server } from '@grpc/grpc-js';
/**
 * This provider will creates a gRPC Server
 */
export declare class ServerProvider implements Provider<Server> {
    private server;
    value(): Server;
}
