import { Provider } from '@loopback/context';
import { GrpcGenerator } from '../grpc.generator';
import { GrpcComponentConfig } from '../types';
/**
 * This provider will return a gRPC TypeScript Generator
 * This can be used to generate typescript files and service declarations
 * from proto files on run time.
 */
export declare class GeneratorProvider implements Provider<GrpcGenerator> {
    protected config: GrpcComponentConfig;
    private generator;
    constructor(config: GrpcComponentConfig);
    value(): GrpcGenerator;
}
