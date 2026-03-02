import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { Connection } from 'mongoose';
import { InjectConnection } from '@nestjs/mongoose';
import * as os from 'os';

@Injectable()
export class CoreService {
  constructor(
    @InjectConnection() private readonly connection: Connection,
  ) {}

  health() {
    return {
      status: 'ok',
      service: 'cloudops-backend',
      uptimeSeconds: process.uptime(),
      memoryUsageMB: Math.round(process.memoryUsage().rss / 1024 / 1024),
      hostname: os.hostname(),
      version: process.env.APP_VERSION || 'dev',
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * Readiness probe
   * Used by Kubernetes to decide if pod can receive traffic
   */
  ready() {
    const isDbConnected = this.connection.readyState === 1;

    if (!isDbConnected) {
      throw new ServiceUnavailableException({
        status: 'not_ready',
        reason: 'Database not connected',
        timestamp: new Date().toISOString(),
      });
    }

    return {
      status: 'ready',
      database: 'connected',
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * Database status endpoint
   * For ops dashboard / monitoring visibility
   */
  dbStatus() {
    const stateMap = {
      0: 'disconnected',
      1: 'connected',
      2: 'connecting',
      3: 'disconnecting',
    };

    return {
      database: stateMap[this.connection.readyState] || 'unknown',
      timestamp: new Date().toISOString(),
    };
  }
}