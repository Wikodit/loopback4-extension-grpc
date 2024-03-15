import { sendUnaryData, ServerDuplexStream, ServerReadableStream, ServerUnaryCall, ServerWritableStream } from '@grpc/grpc-js';
import BaseController from '../../../grpc.controller';
import { GreeterServer, TestRequest, TestResponse } from './greeter';
export default class GreeterController extends BaseController implements GreeterServer {
    unaryTest(call: ServerUnaryCall<TestRequest, TestResponse>, callback: sendUnaryData<TestResponse>): Promise<void>;
    clientStreamTest(call: ServerReadableStream<TestRequest, TestResponse>, callback: sendUnaryData<TestResponse>): Promise<void>;
    serverStreamTest(call: ServerWritableStream<TestRequest, TestResponse>): Promise<void>;
    bidiStreamTest(call: ServerDuplexStream<TestRequest, TestResponse>): Promise<void>;
}
