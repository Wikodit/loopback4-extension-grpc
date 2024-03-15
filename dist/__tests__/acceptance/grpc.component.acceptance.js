"use strict";
// Copyright IBM Corp. 2019. All Rights Reserved.
// Node module: @loopback/grpc
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const testlab_1 = require("@loopback/testlab");
const grpc_sequence_1 = require("../../grpc.sequence");
const greeter_1 = require("../fixtures/client/greeter");
const grpc_js_1 = require("@grpc/grpc-js");
const path_1 = require("path");
const greeter_controller_1 = (0, tslib_1.__importDefault)(require("../fixtures/server/greeter.controller"));
const keys_1 = require("../../keys");
const grpc_component_1 = require("../../grpc.component");
// import {readFileSync} from 'fs';
describe('GrpcComponent', () => {
    // gRPC Component Configurations
    it('defines grpc component configurations', async () => {
        const app = givenApplication();
        const lbGrpcServer = await app.getServer('GrpcServer');
        (0, testlab_1.expect)(lbGrpcServer.getSync(keys_1.GrpcBindings.PORT)).to.be.eql(5050);
    });
    // LoopBack gRPC Service
    it('creates a grpc service which handles unary calls', async () => {
        // Load LoopBack Application
        const app = givenApplication();
        app.controller(greeter_controller_1.default);
        await app.start();
        // Make gRPC Client Unary Call
        const unaryResult = await promisifyUnaryCall({
            client: getGrpcClient(app),
            data: { name: 'World' },
        });
        (0, testlab_1.expect)(unaryResult.message).to.eql('Hello World');
        await app.stop();
    });
    // LoopBack gRPC Service
    it('creates a grpc service which handles client streaming calls', async () => {
        // Load LoopBack Application
        const app = givenApplication();
        app.controller(greeter_controller_1.default);
        await app.start();
        // Make gRPC Client Client Streaming Call
        const clientStreamingResult = await promisifyClientStreamingCall({
            client: getGrpcClient(app),
            data: [{ name: 'Hello' }, { name: 'Big' }, { name: 'World' }],
        });
        (0, testlab_1.expect)(clientStreamingResult.message).to.eql('Hello Big World');
        await app.stop();
    });
    // LoopBack gRPC Service
    it('creates a grpc service which handles server streaming calls', async () => {
        // Load LoopBack Application
        const app = givenApplication();
        app.controller(greeter_controller_1.default);
        await app.start();
        // Make gRPC Client Server Streaming Call
        const serverStreamingResult = await promisifyServerStreamingCall({
            client: getGrpcClient(app),
            data: { name: 'Hello Big World' },
        });
        (0, testlab_1.expect)(serverStreamingResult).to.eql([
            { message: 'Hello' },
            { message: 'Big' },
            { message: 'World' },
        ]);
        await app.stop();
    });
    // LoopBack gRPC Service
    it('creates a grpc service which handles bidirectional streaming calls', async () => {
        // Load LoopBack Application
        const app = givenApplication();
        app.controller(greeter_controller_1.default);
        await app.start();
        // Make gRPC Client Bidi Streaming Call
        const bidiStreamingResult = await promisifyBibiStreamingCall({
            client: getGrpcClient(app),
            data: [{ name: 'Hello' }, { name: 'World' }],
        });
        (0, testlab_1.expect)(bidiStreamingResult).to.eql([
            { message: 'Got Hello !' },
            { message: 'Got World !' },
        ]);
        await app.stop();
    });
    // LoopBack gRPC Service
    it('creates a grpc service with custom sequence', async () => {
        class MySequence extends grpc_sequence_1.GrpcSequence {
            async unaryCall(call) {
                const reply = await super.unaryCall(call);
                reply.message += ' Sequenced';
                return reply;
            }
        }
        // Load LoopBack Application
        const app = givenApplication({ sequence: MySequence });
        app.controller(greeter_controller_1.default);
        await app.start();
        // Make gRPC Client Unary Call
        const result = await promisifyUnaryCall({
            client: getGrpcClient(app),
            data: { name: 'World' },
        });
        (0, testlab_1.expect)(result.message).to.eql('Hello World Sequenced');
        await app.stop();
    });
    // LoopBack gRPC Service
    it('creates a grpc service with tls', async () => {
        // Load LoopBack Application
        const app = givenApplication({
            tls: {
                rootCertPath: (0, path_1.join)(process.cwd(), 'fixtures', 'cert', 'ca', 'grpc.crt'),
                keyCertPairPaths: [
                    {
                        privateKeyPath: (0, path_1.join)(process.cwd(), 'fixtures', 'cert', 'server', 'server.key'),
                        certChainPath: (0, path_1.join)(process.cwd(), 'fixtures', 'cert', 'server', 'server.crt'),
                    },
                ],
            },
        });
        app.controller(greeter_controller_1.default);
        await app.start();
        try {
            const insecureResult = await promisifyUnaryCall({
                client: getGrpcClient(app),
                data: { name: 'World' },
            });
            (0, testlab_1.expect)(insecureResult).to.eql(null, 'Should never happen');
        }
        catch (e) {
            (0, testlab_1.expect)(e).to.have.property('code', 14);
        }
        // Make gRPC Client Unary Call
        // uncomment these two lines if you want to test mTLS call
        // but read README.md before
        // const tlsResult: TestResponse = await promisifyUnaryCall({
        //   client: getGrpcClient(app, {
        //     hostname: 'server.grpc.loopback.local',
        //     rootCerts: readFileSync(
        //       join(process.cwd(), 'fixtures', 'cert', 'ca', 'grpc.crt'),
        //     ),
        //   }),
        //   data: {name: 'World'},
        // });
        // expect(tlsResult.message).to.eql('Hello World');
        await app.stop();
    });
    // LoopBack gRPC Service
    it('creates a grpc service with mtls', async () => {
        // Load LoopBack Application
        const app = givenApplication({
            tls: {
                rootCertPath: (0, path_1.join)(process.cwd(), 'fixtures', 'cert', 'ca', 'grpc.crt'),
                keyCertPairPaths: [
                    {
                        privateKeyPath: (0, path_1.join)(process.cwd(), 'fixtures', 'cert', 'server', 'server.key'),
                        certChainPath: (0, path_1.join)(process.cwd(), 'fixtures', 'cert', 'server', 'server.crt'),
                    },
                ],
                checkClientCertificate: true,
            },
        });
        app.controller(greeter_controller_1.default);
        await app.start();
        try {
            const insecureResult = await promisifyUnaryCall({
                client: getGrpcClient(app),
                data: { name: 'World' },
            });
            (0, testlab_1.expect)(insecureResult).to.eql(null, 'Should never happen');
        }
        catch (e) {
            (0, testlab_1.expect)(e).to.have.property('code', 14);
        }
        // Make gRPC Client Unary Call
        // uncomment these two lines if you want to test mTLS call
        // but read README.md before
        // const mtlsResult: TestResponse = await promisifyUnaryCall({
        //   client: getGrpcClient(app, {
        //     hostname: 'server.grpc.loopback.local',
        //     rootCerts: readFileSync(
        //       join(process.cwd(), 'fixtures', 'cert', 'ca', 'grpc.crt'),
        //     ),
        //     privateKey: readFileSync(
        //       join(process.cwd(), 'fixtures', 'cert', 'client', 'client.key'),
        //     ),
        //     certChain: readFileSync(
        //       join(process.cwd(), 'fixtures', 'cert', 'client', 'client.crt'),
        //     ),
        //   }),
        //   data: {name: 'World'},
        // });
        // expect(mtlsResult.message).to.eql('Hello World');
        await app.stop();
    });
});
/**
 * Returns gRPC Enabled Application
 **/
function givenApplication(options) {
    const grpcConfig = {
        server: { port: 5050, tls: options === null || options === void 0 ? void 0 : options.tls },
    };
    if (options === null || options === void 0 ? void 0 : options.sequence) {
        grpcConfig.sequence = options === null || options === void 0 ? void 0 : options.sequence;
    }
    const app = new core_1.Application({
        grpc: grpcConfig,
    });
    app.component(grpc_component_1.GrpcComponent);
    return app;
}
function getGrpcClient(app, tls) {
    if (!tls) {
        return new greeter_1.GreeterClient(`${app.getSync(keys_1.GrpcBindings.HOST)}:${app.getSync(keys_1.GrpcBindings.PORT)}`, grpc_js_1.ChannelCredentials.createInsecure());
    }
    return new greeter_1.GreeterClient(`${tls.hostname}:${app.getSync(keys_1.GrpcBindings.PORT)}`, grpc_js_1.ChannelCredentials.createSsl(tls.rootCerts, tls.privateKey, tls.certChain));
}
/**
 * Unary call to Promise Wrapper
 **/
async function promisifyUnaryCall(input) {
    const client = input.client;
    return new Promise((resolve, reject) => client.unaryTest(input.data, (err, response) => {
        if (err) {
            reject(err);
        }
        else {
            resolve(response);
        }
    }));
}
/**
 * Client streaming to Promise Wrapper
 **/
async function promisifyClientStreamingCall(input) {
    const client = input.client;
    return new Promise((resolve, reject) => {
        const call = client.clientStreamTest((err, response) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(response);
            }
        });
        for (const chunk of input.data) {
            call.write(chunk);
        }
        call.end();
    });
}
/**
 * Server streaming to Promise Wrapper
 **/
async function promisifyServerStreamingCall(input) {
    const client = input.client;
    return new Promise((resolve, reject) => {
        const call = client.serverStreamTest(input.data);
        const chunks = [];
        call.on('data', (chunk) => {
            chunks.push(chunk);
        });
        call.on('end', () => resolve(chunks));
        call.on('error', reject);
    });
}
/**
 * Bidirectional streaming to Promise Wrapper
 **/
async function promisifyBibiStreamingCall(input) {
    const client = input.client;
    return new Promise((resolve, reject) => {
        const call = client.bidiStreamTest();
        for (const chunk of input.data) {
            call.write(chunk);
        }
        call.end();
        const chunks = [];
        call.on('data', (chunk) => {
            chunks.push(chunk);
        });
        call.on('end', () => resolve(chunks));
        call.on('error', reject);
    });
}
//# sourceMappingURL=grpc.component.acceptance.js.map