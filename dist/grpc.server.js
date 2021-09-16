"use strict";
// Copyright IBM Corp. 2017,2019. All Rights Reserved.
// Node module: @loopback/grpc
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.GrpcServer = void 0;
const tslib_1 = require("tslib");
const context_1 = require("@loopback/context");
const core_1 = require("@loopback/core");
const grpc_js_1 = require("@grpc/grpc-js");
const metadata_1 = require("@loopback/metadata");
const grpc_decorator_1 = require("./decorators/grpc.decorator");
const grpc_generator_1 = require("./grpc.generator");
const keys_1 = require("./keys");
const fs_1 = require("fs");
const debug_1 = (0, tslib_1.__importDefault)(require("debug"));
const debug = (0, debug_1.default)('loopback:grpc:setup');
/**
 * This Class provides a LoopBack Server implementing gRPC
 */
let GrpcServer = class GrpcServer extends context_1.Context {
    /**
     * @memberof GrpcServer
     * Creates an instance of GrpcServer.
     *
     * @param app - The application instance (injected via
     * CoreBindings.APPLICATION_INSTANCE).
     * @param server - The actual gRPC Server module (injected via
     * GrpcBindings.GRPC_SERVER).
     * @param options - The configuration options (injected via
     * GRPCBindings.CONFIG).
     *
     */
    constructor(app, server, host, port, generator, config) {
        super(app);
        this.app = app;
        this.server = server;
        this.host = host;
        this.port = port;
        this.generator = generator;
        this.config = config;
        this._listening = false;
        // Execute TypeScript Generator. It loads protos.
        this.generator.execute();
        // Setup Controllers
        for (const c of this.find('controllers.*')) {
            const controllerName = c.key.replace(/^controllers\./, '');
            const ctor = c.valueConstructor;
            if (!ctor) {
                throw new Error(`The controller ${controllerName} was not bound via .toClass()`);
            }
            this._setupControllerMethods(ctor);
        }
    }
    get listening() {
        return this._listening;
    }
    async start() {
        var _a, _b;
        let credentials;
        if ((_b = (_a = this.config.server) === null || _a === void 0 ? void 0 : _a.tls) === null || _b === void 0 ? void 0 : _b.keyCertPairPaths.length) {
            const rootCert = (0, fs_1.readFileSync)(this.config.server.tls.rootCertPath);
            const keyCertPairs = this.config.server.tls.keyCertPairPaths.map((kcpp) => ({
                // eslint-disable-next-line @typescript-eslint/naming-convention
                private_key: (0, fs_1.readFileSync)(kcpp.privateKeyPath),
                // eslint-disable-next-line @typescript-eslint/naming-convention
                cert_chain: (0, fs_1.readFileSync)(kcpp.certChainPath),
            }));
            credentials = grpc_js_1.ServerCredentials.createSsl(rootCert, keyCertPairs, this.config.server.tls.checkClientCertificate);
        }
        else {
            credentials = grpc_js_1.ServerCredentials.createInsecure();
        }
        return new Promise((resolve, reject) => {
            this.server.bindAsync(`${this.host}:${this.port}`, credentials, (error) => {
                if (error) {
                    reject(error);
                }
                this.server.start();
                this._listening = true;
                resolve();
            });
        });
    }
    async stop() {
        this.server.forceShutdown();
        this._listening = false;
    }
    _setupControllerMethods(ctor) {
        var _a, _b;
        const controllerMethods = (_a = metadata_1.MetadataInspector.getAllMethodMetadata(grpc_decorator_1.GRPC_METHODS, ctor.prototype)) !== null && _a !== void 0 ? _a : {};
        const services = new Map();
        for (const methodName in controllerMethods) {
            const config = controllerMethods[methodName];
            debug('Config for method %s', methodName, config);
            const proto = this.generator.getProto(config.PROTO_NAME);
            debug('Proto for %s', config.PROTO_NAME, proto);
            if (!proto) {
                throw new Error(`Grpc Server: No proto file was provided.`);
            }
            const splittedPkgName = config.PROTO_PACKAGE.split('.');
            let pkgMeta = proto[(_b = splittedPkgName.shift()) !== null && _b !== void 0 ? _b : ''];
            for (const pkgName of splittedPkgName) {
                pkgMeta = pkgMeta[pkgName];
            }
            debug('Package for %s', config.PROTO_PACKAGE, pkgMeta);
            const serviceMeta = pkgMeta[config.SERVICE_NAME];
            debug('Service for %s', config.SERVICE_NAME, serviceMeta);
            const serviceDef = serviceMeta.service;
            let setupMethod = 'setupGrpcUnaryCall';
            if (config.REQUEST_STREAM && config.RESPONSE_STREAM) {
                setupMethod = 'setupGrpcBidiStreamingCall';
            }
            else if (config.REQUEST_STREAM) {
                setupMethod = 'setupGrpcClientStreamingCall';
            }
            else if (config.RESPONSE_STREAM) {
                setupMethod = 'setupGrpcServerStreamingCall';
            }
            if (!services.has(serviceDef)) {
                services.set(serviceDef, {
                    // cast needed because ts won't allow to call method
                    [config.METHOD_NAME]: this[setupMethod](ctor, methodName),
                });
            }
            else {
                const methods = services.get(serviceDef);
                methods[config.METHOD_NAME] = this[setupMethod](ctor, methodName);
            }
        }
        for (const [service, methods] of services.entries()) {
            if (debug.enabled) {
                debug('Adding service:', service, Object.keys(methods));
            }
            this.server.addService(service, methods);
        }
    }
    /**
     * Set up unary gRPC call
     * @param prototype
     * @param methodName
     */
    setupGrpcUnaryCall(ctor, methodName) {
        return (call, callback) => {
            const handleUnary = async () => {
                this.bind(keys_1.GrpcBindings.CONTEXT).to(this);
                this.bind(keys_1.GrpcBindings.GRPC_CONTROLLER)
                    .toClass(ctor)
                    .inScope(context_1.BindingScope.SINGLETON);
                this.bind(keys_1.GrpcBindings.GRPC_METHOD_NAME).to(methodName);
                const sequence = await this.get(keys_1.GrpcBindings.GRPC_SEQUENCE);
                return sequence.unaryCall(call);
            };
            handleUnary().then((result) => callback(null, result), (error) => {
                callback(error, null);
            });
        };
    }
    /**
     * Set up client streaming gRPC call
     * @param prototype
     * @param methodName
     */
    setupGrpcClientStreamingCall(ctor, methodName) {
        return (call, callback) => {
            const handleClientStreaming = async () => {
                this.bind(keys_1.GrpcBindings.CONTEXT).to(this);
                this.bind(keys_1.GrpcBindings.GRPC_CONTROLLER)
                    .toClass(ctor)
                    .inScope(context_1.BindingScope.SINGLETON);
                this.bind(keys_1.GrpcBindings.GRPC_METHOD_NAME).to(methodName);
                const sequence = await this.get(keys_1.GrpcBindings.GRPC_SEQUENCE);
                return sequence.clientStreamingCall(call);
            };
            handleClientStreaming().then((result) => callback(null, result), (error) => {
                callback(error, null);
            });
        };
    }
    /**
     * Set up server streaming gRPC call
     * @param prototype
     * @param methodName
     */
    setupGrpcServerStreamingCall(ctor, methodName) {
        return (call) => {
            const handleServerStreaming = async () => {
                this.bind(keys_1.GrpcBindings.CONTEXT).to(this);
                this.bind(keys_1.GrpcBindings.GRPC_CONTROLLER)
                    .toClass(ctor)
                    .inScope(context_1.BindingScope.SINGLETON);
                this.bind(keys_1.GrpcBindings.GRPC_METHOD_NAME).to(methodName);
                const sequence = await this.get(keys_1.GrpcBindings.GRPC_SEQUENCE);
                return sequence.serverStreamingCall(call);
            };
            handleServerStreaming()
                .catch((err) => call.emit('err', err))
                .finally(() => {
                if (call.writable)
                    call.end();
            });
        };
    }
    /**
     * Set up bidirectional streaming gRPC call
     * @param prototype
     * @param methodName
     */
    setupGrpcBidiStreamingCall(ctor, methodName) {
        return (call) => {
            const handleBidi = async () => {
                this.bind(keys_1.GrpcBindings.CONTEXT).to(this);
                this.bind(keys_1.GrpcBindings.GRPC_CONTROLLER)
                    .toClass(ctor)
                    .inScope(context_1.BindingScope.SINGLETON);
                this.bind(keys_1.GrpcBindings.GRPC_METHOD_NAME).to(methodName);
                const sequence = await this.get(keys_1.GrpcBindings.GRPC_SEQUENCE);
                return sequence.bidiStreamingCall(call);
            };
            handleBidi()
                .catch((err) => call.emit('error', err))
                .finally(() => {
                if (call.writable)
                    call.end();
            });
        };
    }
};
GrpcServer = (0, tslib_1.__decorate)([
    (0, tslib_1.__param)(0, (0, context_1.inject)(core_1.CoreBindings.APPLICATION_INSTANCE)),
    (0, tslib_1.__param)(1, (0, context_1.inject)(keys_1.GrpcBindings.GRPC_SERVER)),
    (0, tslib_1.__param)(2, (0, context_1.inject)(keys_1.GrpcBindings.HOST)),
    (0, tslib_1.__param)(3, (0, context_1.inject)(keys_1.GrpcBindings.PORT)),
    (0, tslib_1.__param)(4, (0, context_1.inject)(keys_1.GrpcBindings.GRPC_GENERATOR)),
    (0, tslib_1.__param)(5, (0, context_1.inject)(keys_1.GrpcBindings.CONFIG)),
    (0, tslib_1.__metadata)("design:paramtypes", [core_1.Application,
        grpc_js_1.Server, String, String, grpc_generator_1.GrpcGenerator, Object])
], GrpcServer);
exports.GrpcServer = GrpcServer;
//# sourceMappingURL=grpc.server.js.map