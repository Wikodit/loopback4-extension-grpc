"use strict";
// Copyright IBM Corp. 2017,2019. All Rights Reserved.
// Node module: @loopback/grpc
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.GrpcGenerator = void 0;
const tslib_1 = require("tslib");
const child_process_1 = require("child_process");
const glob = (0, tslib_1.__importStar)(require("glob"));
const path = (0, tslib_1.__importStar)(require("path"));
const grpc_js_1 = require("@grpc/grpc-js");
const proto_loader_1 = require("@grpc/proto-loader");
const debug_1 = (0, tslib_1.__importDefault)(require("debug"));
const debug = (0, debug_1.default)('loopback:grpc:generator');
/**
 * gRPC TypeScript generator.
 * This class will iterate over a directory generating
 * corresponding typescript files from proto files.
 * Required for `@grpc` configuration and strict development.
 */
class GrpcGenerator {
    /**
     * @param - config
     */
    constructor(config) {
        this.config = config;
        /**
         * proto instances directory loaded during
         * boot time and later being used by implemented gRPC
         * controllers.
         */
        this.protos = {};
    }
    /**
     * This method will find and load all protos
     * contained within the project directory. Saving in memory
     * instances for those found protos for later usage.
     */
    execute() {
        this.getProtoPaths().forEach((protoPath) => {
            var _a, _b, _c;
            const cwd = process.cwd();
            const absoluteProtoFilePath = path.join(cwd, protoPath);
            const includeDirs = this.getIncludeDirsFromProtoPath(absoluteProtoFilePath);
            if (((_a = this.config) === null || _a === void 0 ? void 0 : _a.load) !== false) {
                const protoName = includeDirs === path.dirname(absoluteProtoFilePath)
                    ? (_b = path.basename(absoluteProtoFilePath)) !== null && _b !== void 0 ? _b : ''
                    : path.relative(includeDirs, absoluteProtoFilePath);
                this.protos[protoName] = this.loadProto(absoluteProtoFilePath, includeDirs);
            }
            if ((_c = this.config) === null || _c === void 0 ? void 0 : _c.generate)
                this.generate(absoluteProtoFilePath, includeDirs);
        });
    }
    /**
     * This method will return a proto instance
     * from the proto list directory, previously loaded during
     * boot time.
     *
     * @param name
     */
    getProto(name) {
        return this.protos[name];
    }
    /**
     * This method receive a proto file path and
     * load that proto using the official grpc library.
     *
     * @param absoluteProtoPath
     * @param includeDirs
     */
    loadProto(absoluteProtoPath, includeDirs) {
        debug('Loading proto at %s with includeDirs', absoluteProtoPath, includeDirs);
        const proto = (0, grpc_js_1.loadPackageDefinition)((0, proto_loader_1.loadSync)(absoluteProtoPath, {
            includeDirs: [includeDirs],
        }));
        return proto;
    }
    /**
     * This method will getProtoPaths a directory look ahead and
     * typescript files generations from found proto files.
     */
    getProtoPaths() {
        var _a, _b, _c, _d, _e, _f;
        const pattern = (_b = (_a = this.config) === null || _a === void 0 ? void 0 : _a.protoPattern) !== null && _b !== void 0 ? _b : '**/*.proto';
        const ignores = (_d = (_c = this.config) === null || _c === void 0 ? void 0 : _c.protoIgnores) !== null && _d !== void 0 ? _d : ['**/node_modules/**'];
        const options = {
            cwd: (_f = (_e = this.config) === null || _e === void 0 ? void 0 : _e.cwd) !== null && _f !== void 0 ? _f : process.cwd(),
            ignore: ignores,
            nodir: true,
        };
        return glob.sync(pattern, options);
    }
    /**
     * This method will generate a typescript
     * file representing the provided proto file by calling
     * google's proto compiler and using `ts-proto` plugin.
     * https://github.com/stephenh/ts-proto
     * @param absoluteProtoPath
     * @param includeDirs
     */
    generate(absoluteProtoPath, includeDirs) {
        var _a, _b, _c, _d, _e, _f;
        debug('Generate TS file from proto at %s with includeDirs', absoluteProtoPath, includeDirs);
        const cwd = (_b = (_a = this.config) === null || _a === void 0 ? void 0 : _a.cwd) !== null && _b !== void 0 ? _b : process.cwd();
        const isWin = ['win32', 'win64'].includes(process.platform);
        return (0, child_process_1.execSync)(`${path.join(__dirname, '../', // Root of grpc module and not the dist dir
        'compilers', process.platform, 'bin', `protoc${isWin ? '.exe' : ''}`)} --plugin=${path.join(cwd, 'node_modules', 'ts-proto', `protoc-gen-ts_proto`)} --ts_proto_out=${this.getOutputPathFromProtoPath(absoluteProtoPath)} --ts_proto_opt=${(_d = (_c = this.config) === null || _c === void 0 ? void 0 : _c.tsOutOptions) !== null && _d !== void 0 ? _d : 'outputServices=grpc-js,outputClientImpl=false,lowerCaseServiceMethods=true,esModuleInterop=true,useDate=false,outputSchema=true,env=node'} ${absoluteProtoPath} -I ${includeDirs} ${(_f = (_e = this.config) === null || _e === void 0 ? void 0 : _e.additionalArgs) !== null && _f !== void 0 ? _f : ''}`);
    }
    getIncludeDirsFromProtoPath(absoluteProtoPath) {
        var _a, _b, _c, _d;
        let includeDirs = path.dirname(absoluteProtoPath);
        if ((_a = this.config) === null || _a === void 0 ? void 0 : _a.protoPath) {
            includeDirs =
                typeof ((_b = this.config) === null || _b === void 0 ? void 0 : _b.protoPath) === 'string'
                    ? (_c = this.config) === null || _c === void 0 ? void 0 : _c.protoPath
                    : (_d = this.config) === null || _d === void 0 ? void 0 : _d.protoPath(absoluteProtoPath);
        }
        return includeDirs;
    }
    getOutputPathFromProtoPath(absoluteProtoPath) {
        var _a, _b, _c, _d;
        let outputPath = path.dirname(absoluteProtoPath);
        if ((_a = this.config) === null || _a === void 0 ? void 0 : _a.tsOutputPath) {
            outputPath =
                typeof ((_b = this.config) === null || _b === void 0 ? void 0 : _b.tsOutputPath) === 'string'
                    ? (_c = this.config) === null || _c === void 0 ? void 0 : _c.tsOutputPath
                    : (_d = this.config) === null || _d === void 0 ? void 0 : _d.tsOutputPath(absoluteProtoPath);
        }
        return outputPath;
    }
}
exports.GrpcGenerator = GrpcGenerator;
//# sourceMappingURL=grpc.generator.js.map