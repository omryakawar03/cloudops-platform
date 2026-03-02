
import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CoreService } from './core.service';

@Controller('core')
export class CoreController {
  constructor(private readonly coreService: CoreService) {}

  /**
   * Liveness Probe
   * Should ALWAYS return 200 if app process is alive
   */
  @Get('health')
  @HttpCode(HttpStatus.OK)
  health() {
    return this.coreService.health();
  }

  /**
   * Readiness Probe
   * Returns 503 if dependencies not ready
   */
  @Get('ready')
  @HttpCode(HttpStatus.OK)
  ready() {
    return this.coreService.ready();
  }

  /**
   * DB Status (Ops Visibility)
   */
  @Get('db-status')
  @HttpCode(HttpStatus.OK)
  dbStatus() {
    return this.coreService.dbStatus();
  }
}