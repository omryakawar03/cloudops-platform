import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './core/core.module';
import { UsersModule } from './users/users.module';
import { OpsModule } from './ops/ops.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [CoreModule, UsersModule, OpsModule, ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: '.env',
    
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
