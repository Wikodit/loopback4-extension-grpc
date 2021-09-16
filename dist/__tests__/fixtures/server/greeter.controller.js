"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const grpc_decorator_1 = require("../../../decorators/grpc.decorator");
const grpc_controller_1 = (0, tslib_1.__importDefault)(require("../../../grpc.controller"));
const greeter_1 = require("./greeter");
class GreeterController extends grpc_controller_1.default {
    // Tell LoopBack that this is a Service RPC implementation
    async unaryTest(call, callback) {
        callback(null, {
            message: 'Hello ' + call.request.name,
        });
    }
    async clientStreamTest(call, callback) {
        const names = await new Promise((resolve, reject) => {
            const names = [];
            call.on('data', (chunk) => names.push(chunk.name));
            call.on('error', (err) => reject(err));
            call.on('end', () => resolve(names));
        });
        callback(null, {
            message: names.join(' '),
        });
    }
    async serverStreamTest(call) {
        const req = call.request.name.split(' ');
        const sleep = (seconds = 0) => new Promise((resolve) => setTimeout(resolve, seconds));
        const writeAfterSleep = (payload, seconds = 0) => (async () => {
            await sleep(seconds);
            call.write(payload);
        })();
        const promises = [];
        promises.push(writeAfterSleep({
            message: req[0],
        }));
        for (let i = 1; i < req.length; i++) {
            promises.push(writeAfterSleep({
                message: req[i],
            }, i * 200));
            if (i === req.length - 1) {
                promises.push((async () => {
                    await sleep((i + 1) * 200);
                    call.end();
                })());
            }
        }
        await Promise.all(promises);
    }
    async bidiStreamTest(call) {
        await new Promise((resolve, reject) => {
            call.on('data', (chunk) => call.write({
                message: `Got ${chunk.name} !`,
            }));
            call.on('error', (err) => reject(err));
            call.on('end', () => call.end());
        });
    }
}
(0, tslib_1.__decorate)([
    (0, grpc_decorator_1.grpc)((0, grpc_decorator_1.getSpecsFromMethodDefinitionAndProtoMetadata)(greeter_1.GreeterService.unaryTest, greeter_1.protoMetadata.fileDescriptor)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object, Function]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], GreeterController.prototype, "unaryTest", null);
(0, tslib_1.__decorate)([
    (0, grpc_decorator_1.grpc)((0, grpc_decorator_1.getSpecsFromMethodDefinitionAndProtoMetadata)(greeter_1.GreeterService.clientStreamTest, greeter_1.protoMetadata.fileDescriptor)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object, Function]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], GreeterController.prototype, "clientStreamTest", null);
(0, tslib_1.__decorate)([
    (0, grpc_decorator_1.grpc)((0, grpc_decorator_1.getSpecsFromMethodDefinitionAndProtoMetadata)(greeter_1.GreeterService.serverStreamTest, greeter_1.protoMetadata.fileDescriptor)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], GreeterController.prototype, "serverStreamTest", null);
(0, tslib_1.__decorate)([
    (0, grpc_decorator_1.grpc)((0, grpc_decorator_1.getSpecsFromMethodDefinitionAndProtoMetadata)(greeter_1.GreeterService.bidiStreamTest, greeter_1.protoMetadata.fileDescriptor)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], GreeterController.prototype, "bidiStreamTest", null);
exports.default = GreeterController;
//# sourceMappingURL=greeter.controller.js.map