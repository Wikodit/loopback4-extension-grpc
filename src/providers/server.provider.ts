// Copyright IBM Corp. 2017,2019. All Rights Reserved.
// Node module: @loopback/grpc
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {Provider, inject} from '@loopback/context';
import {Server} from '@grpc/grpc-js';
import { GrpcComponentConfig } from '../types';
import { GrpcBindings } from '../keys';

/**
 * This provider will creates a gRPC Server
 */
export class ServerProvider implements Provider<Server> {
  private server: Server;
  constructor(
    @inject(GrpcBindings.CONFIG) protected config?: GrpcComponentConfig,
  ){
    this.server = new Server(config?.server?.options);
  }
  public value(): Server {
    return this.server;
  }
}
