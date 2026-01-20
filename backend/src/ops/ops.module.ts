import { Module } from '@nestjs/common';
import { OpsController } from './ops.controller';
import { OpsService } from './ops.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [OpsController],
  providers: [OpsService],
  imports: [ConfigModule],
})
export class OpsModule {}
