// src/metrics/metrics.service.ts

import { Injectable, OnModuleInit } from '@nestjs/common';
import * as client from 'prom-client';

@Injectable()
export class MetricsService implements OnModuleInit {
  private readonly register: client.Registry;
  private readonly httpRequestCounter: client.Counter<string>;
  private readonly httpRequestDuration: client.Histogram<string>;

  constructor() {
    this.register = new client.Registry();

    client.collectDefaultMetrics({
      register: this.register,
      prefix: 'cloudops_',
    });

    this.httpRequestCounter = new client.Counter({
      name: 'cloudops_http_requests_total',
      help: 'Total HTTP requests',
      labelNames: ['method', 'route', 'status'],
      registers: [this.register],
    });

    this.httpRequestDuration = new client.Histogram({
      name: 'cloudops_http_request_duration_seconds',
      help: 'HTTP request duration in seconds',
      labelNames: ['method', 'route', 'status'],
      buckets: [0.1, 0.3, 0.5, 1, 1.5, 2, 5],
      registers: [this.register],
    });
  }

  onModuleInit() {
    // Default metrics already initialized
  }

  incrementRequest(method: string, route: string, status: string) {
    this.httpRequestCounter.inc({ method, route, status });
  }

  observeDuration(
    method: string,
    route: string,
    status: string,
    duration: number,
  ) {
    this.httpRequestDuration.observe(
      { method, route, status },
      duration,
    );
  }

  async getMetrics(): Promise<string> {
    return this.register.metrics();
  }
}