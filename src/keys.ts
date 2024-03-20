// Copyright IBM Corp. 2017,2019. All Rights Reserved.
// Node module: @loopback/grpc
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {BindingKey, Context} from '@loopback/context';
import {Server} from '@grpc/grpc-js';
import {GrpcSequenceInterface} from './grpc.sequence';
import { CoreBindings } from '@loopback/core';

/**
 * Binding keys used by this component.
 */
export namespace GrpcBindings {
  export const GRPC_SERVER = BindingKey.create<Server>('grpc.server');
  export const GRPC_SEQUENCE =
    BindingKey.create<GrpcSequenceInterface>('grpc.sequence');
  export const GRPC_CONTROLLER = 'grpc.controller';
  export const GRPC_METHOD = 'grpc.method';
  export const GRPC_METHOD_NAME = BindingKey.create<string>('grpc.method.name');
  export const GRPC_GENERATOR = 'grpc.generator';
  export const CONTEXT = BindingKey.create<Context>('grpc.context');
  export const HOST = BindingKey.create<string | undefined>('grpc.host');
  export const PORT = BindingKey.create<number | undefined>('grpc.port');
  export const CONFIG = `${CoreBindings.APPLICATION_CONFIG}#grpc`;
}
