import { BindingKey, Context } from '@loopback/context';
import { Server } from '@grpc/grpc-js';
import { GrpcSequenceInterface } from './grpc.sequence';
/**
 * Binding keys used by this component.
 */
export declare namespace GrpcBindings {
    const GRPC_SERVER: BindingKey<Server>;
    const GRPC_SEQUENCE: BindingKey<GrpcSequenceInterface>;
    const GRPC_CONTROLLER = "grpc.controller";
    const GRPC_METHOD = "grpc.method";
    const GRPC_METHOD_NAME: BindingKey<string>;
    const GRPC_GENERATOR = "grpc.generator";
    const CONTEXT: BindingKey<Context>;
    const HOST: BindingKey<string | undefined>;
    const PORT: BindingKey<number | undefined>;
    const CONFIG: string;
}
