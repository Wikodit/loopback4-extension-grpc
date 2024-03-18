import { FileDescriptorProto } from 'ts-proto-descriptors';
import _m0 from 'protobufjs/minimal';
import { UntypedServiceImplementation, handleUnaryCall, handleClientStreamingCall, handleServerStreamingCall, handleBidiStreamingCall } from '@grpc/grpc-js';
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
    fromPartial<I extends {
        name?: string | undefined;
    } & {
        name?: string | undefined;
    } & Record<Exclude<keyof I, "name">, never>>(object: I): TestRequest;
};
export declare const TestResponse: {
    encode(message: TestResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): TestResponse;
    fromJSON(object: any): TestResponse;
    toJSON(message: TestResponse): unknown;
    fromPartial<I extends {
        message?: string | undefined;
    } & {
        message?: string | undefined;
    } & Record<Exclude<keyof I, "message">, never>>(object: I): TestResponse;
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
export interface ProtoMetadata {
    fileDescriptor: FileDescriptorProto;
    references: {
        [key: string]: any;
    };
    dependencies?: ProtoMetadata[];
}
export declare const protoMetadata: ProtoMetadata;
declare type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
declare type KeysOfUnion<T> = T extends T ? keyof T : never;
export declare type Exact<P, I extends P> = P extends Builtin ? P : P & {
    [K in keyof P]: Exact<P[K], I[K]>;
} & Record<Exclude<keyof I, KeysOfUnion<P>>, never>;
export {};
