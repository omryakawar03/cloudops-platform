import { Injectable } from '@nestjs/common';
import { Connection } from 'mongoose';
import { InjectConnection } from '@nestjs/mongoose';
@Injectable()
export class CoreService {
    constructor(
        @InjectConnection() private readonly connection: Connection,
      ) {}
    
    health() {
        return {  status: 'ok',
            message: 'API is running successfully from the core service and /core/health endpoint',
            timestamp: new Date().toISOString(), };
      }
    
      ready() {
        const isDbConnected = this.connection.readyState === 1;
        return { status: 'ok',
            message: 'API is ready from the core service and /core/ready endpoint',
            timestamp: new Date().toISOString(),
            database: isDbConnected ? 'connected' : 'disconnected', };
      }
      dbStatus() {
        return {
          database:
            this.connection.readyState === 1
              ? 'connected'
              : 'disconnected',
        };
      }
}
