/// <reference types="node" />
import { ChannelCredentials, ChannelOptions, UntypedServiceImplementation, handleUnaryCall, handleClientStreamingCall, handleServerStreamingCall, handleBidiStreamingCall, Client, ClientUnaryCall, Metadata, CallOptions, ClientWritableStream, ClientReadableStream, ClientDuplexStream, ServiceError } from '@grpc/grpc-js';
import _m0 from 'protobufjs/minimal';
export declare const protobufPackage = "greeterpackage";
/** The request message containing the user's name. */
export interface TestRequest {
    name: string;
}
/** The response message containing the greetings */
export interface TestResponse {
    message: string;
}
export declare const TestRequest: {
    encode(message: TestRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): TestRequest;
    fromJSON(object: any): TestRequest;
    toJSON(message: TestRequest): unknown;
    fromPartial(object: DeepPartial<TestRequest>): TestRequest;
};
export declare const TestResponse: {
    encode(message: TestResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): TestResponse;
    fromJSON(object: any): TestResponse;
    toJSON(message: TestResponse): unknown;
    fromPartial(object: DeepPartial<TestResponse>): TestResponse;
};
export declare const GreeterService: {
    /** Sends a greeting */
    readonly unaryTest: {
        readonly path: "/greeterpackage.Greeter/UnaryTest";
        readonly requestStream: false;
        readonly responseStream: false;
        readonly requestSerialize: (value: TestRequest) => Buffer;
        readonly requestDeserialize: (value: Buffer) => TestRequest;
        readonly responseSerialize: (value: TestResponse) => Buffer;
        readonly responseDeserialize: (value: Buffer) => TestResponse;
    };
    readonly clientStreamTest: {
        readonly path: "/greeterpackage.Greeter/ClientStreamTest";
        readonly requestStream: true;
        readonly responseStream: false;
        readonly requestSerialize: (value: TestRequest) => Buffer;
        readonly requestDeserialize: (value: Buffer) => TestRequest;
        readonly responseSerialize: (value: TestResponse) => Buffer;
        readonly responseDeserialize: (value: Buffer) => TestResponse;
    };
    readonly serverStreamTest: {
        readonly path: "/greeterpackage.Greeter/ServerStreamTest";
        readonly requestStream: false;
        readonly responseStream: true;
        readonly requestSerialize: (value: TestRequest) => Buffer;
        readonly requestDeserialize: (value: Buffer) => TestRequest;
        readonly responseSerialize: (value: TestResponse) => Buffer;
        readonly responseDeserialize: (value: Buffer) => TestResponse;
    };
    readonly bidiStreamTest: {
        readonly path: "/greeterpackage.Greeter/BidiStreamTest";
        readonly requestStream: true;
        readonly responseStream: true;
        readonly requestSerialize: (value: TestRequest) => Buffer;
        readonly requestDeserialize: (value: Buffer) => TestRequest;
        readonly responseSerialize: (value: TestResponse) => Buffer;
        readonly responseDeserialize: (value: Buffer) => TestResponse;
    };
};
export interface GreeterServer extends UntypedServiceImplementation {
    /** Sends a greeting */
    unaryTest: handleUnaryCall<TestRequest, TestResponse>;
    clientStreamTest: handleClientStreamingCall<TestRequest, TestResponse>;
    serverStreamTest: handleServerStreamingCall<TestRequest, TestResponse>;
    bidiStreamTest: handleBidiStreamingCall<TestRequest, TestResponse>;
}
export interface GreeterClient extends Client {
    /** Sends a greeting */
    unaryTest(request: TestRequest, callback: (error: ServiceError | null, response: TestResponse) => void): ClientUnaryCall;
    unaryTest(request: TestRequest, metadata: Metadata, callback: (error: ServiceError | null, response: TestResponse) => void): ClientUnaryCall;
    unaryTest(request: TestRequest, metadata: Metadata, options: Partial<CallOptions>, callback: (error: ServiceError | null, response: TestResponse) => void): ClientUnaryCall;
    clientStreamTest(callback: (error: ServiceError | null, response: TestResponse) => void): ClientWritableStream<TestRequest>;
    clientStreamTest(metadata: Metadata, callback: (error: ServiceError | null, response: TestResponse) => void): ClientWritableStream<TestRequest>;
    clientStreamTest(options: Partial<CallOptions>, callback: (error: ServiceError | null, response: TestResponse) => void): ClientWritableStream<TestRequest>;
    clientStreamTest(metadata: Metadata, options: Partial<CallOptions>, callback: (error: ServiceError | null, response: TestResponse) => void): ClientWritableStream<TestRequest>;
    serverStreamTest(request: TestRequest, options?: Partial<CallOptions>): ClientReadableStream<TestResponse>;
    serverStreamTest(request: TestRequest, metadata?: Metadata, options?: Partial<CallOptions>): ClientReadableStream<TestResponse>;
    bidiStreamTest(): ClientDuplexStream<TestRequest, TestResponse>;
    bidiStreamTest(options: Partial<CallOptions>): ClientDuplexStream<TestRequest, TestResponse>;
    bidiStreamTest(metadata: Metadata, options?: Partial<CallOptions>): ClientDuplexStream<TestRequest, TestResponse>;
}
export declare const GreeterClient: new (address: string, credentials: ChannelCredentials, options?: Partial<ChannelOptions> | undefined) => GreeterClient;
declare type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
export {};
