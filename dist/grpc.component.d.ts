import { Component, ProviderMap, Server, Application } from '@loopback/core';
import { Constructor } from '@loopback/context';
import { GrpcComponentConfig } from './types';
/**
 * Grpc Component for LoopBack 4.
 */
export declare class GrpcComponent implements Component {
    /**
     * Export GrpcProviders
     */
    providers: ProviderMap;
    /**
     * Export Grpc Server
     */
    servers: {
        [name: string]: Constructor<Server>;
    };
    constructor(app: Application, config: GrpcComponentConfig);
}
