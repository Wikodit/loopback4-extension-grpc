"use strict";
// Copyright IBM Corp. 2019. All Rights Reserved.
// Node module: @loopback/grpc
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const metadata_1 = require("@loopback/metadata");
const testlab_1 = require("@loopback/testlab");
const grpc_decorator_1 = require("../../../decorators/grpc.decorator");
const greeter_controller_1 = (0, tslib_1.__importDefault)(require("../../fixtures/server/greeter.controller"));
describe('@grpc decorator', () => {
    it('defines reflection metadata for rpc method', () => {
        const controllerMethods = metadata_1.MetadataInspector.getAllMethodMetadata(grpc_decorator_1.GRPC_METHODS, greeter_controller_1.default.prototype);
        (0, testlab_1.expect)(controllerMethods).to.have.property('unaryTest');
        (0, testlab_1.expect)(controllerMethods).to.have.property('clientStreamTest');
        (0, testlab_1.expect)(controllerMethods).to.have.property('serverStreamTest');
        (0, testlab_1.expect)(controllerMethods).to.have.property('bidiStreamTest');
    });
});
//# sourceMappingURL=grpc.decorator.unit.js.map