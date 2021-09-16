import { GrpcComponentConfig } from './types';
import { GrpcObject } from '@grpc/grpc-js';
/**
 * gRPC TypeScript generator.
 * This class will iterate over a directory generating
 * corresponding typescript files from proto files.
 * Required for `@grpc` configuration and strict development.
 */
export declare class GrpcGenerator {
    protected readonly config: GrpcComponentConfig['compilerOptions'];
    /**
     * proto instances directory loaded during
     * boot time and later being used by implemented gRPC
     * controllers.
     */
    private protos;
    /**
     * @param - config
     */
    constructor(config: GrpcComponentConfig['compilerOptions']);
    /**
     * This method will find and load all protos
     * contained within the project directory. Saving in memory
     * instances for those found protos for later usage.
     */
    execute(): void;
    /**
     * This method will return a proto instance
     * from the proto list directory, previously loaded during
     * boot time.
     *
     * @param name
     */
    getProto(name: string): GrpcObject;
    /**
     * This method receive a proto file path and
     * load that proto using the official grpc library.
     *
     * @param absoluteProtoPath
     * @param includeDirs
     */
    loadProto(absoluteProtoPath: string, includeDirs: string): GrpcObject;
    /**
     * This method will getProtoPaths a directory look ahead and
     * typescript files generations from found proto files.
     */
    getProtoPaths(): string[];
    /**
     * This method will generate a typescript
     * file representing the provided proto file by calling
     * google's proto compiler and using `ts-proto` plugin.
     * https://github.com/stephenh/ts-proto
     * @param absoluteProtoPath
     * @param includeDirs
     */
    private generate;
    private getIncludeDirsFromProtoPath;
    private getOutputPathFromProtoPath;
}
