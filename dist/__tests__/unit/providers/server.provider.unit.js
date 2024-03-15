"use strict";
// Copyright IBM Corp. 2019. All Rights Reserved.
// Node module: @loopback/grpc
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
const testlab_1 = require("@loopback/testlab");
const __1 = require("../../..");
describe('ServerProvider', () => {
    it('returns a grpc singleton server', () => {
        const server = new __1.ServerProvider().value();
        (0, testlab_1.expect)(server).to.be.an.Object();
        (0, testlab_1.expect)(server.bind).to.be.a.Function();
        (0, testlab_1.expect)(server.start).to.be.a.Function();
        (0, testlab_1.expect)(server.addProtoService).to.be.a.Function();
    });
});
//# sourceMappingURL=server.provider.unit.js.map