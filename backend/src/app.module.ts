import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './core/core.module';
import { UsersModule } from './users/users.module';
import { OpsModule } from './ops/ops.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {MongooseModule} from '@nestjs/mongoose';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { MetricsModule } from './metrics/metrics.module';
import { MetricsInterceptor } from './metrics/metrics.interceptor';
import { LoggingInterceptor } from './common/logging.interceptor';

@Module({
  imports: [  MetricsModule,  ConfigModule.forRoot({isGlobal: true, envFilePath: '.env', }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        uri: config.get<string>('MONGO_URI'),
      }),
    }),
    CoreModule,
     UsersModule,
      OpsModule, ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_INTERCEPTOR, useClass: MetricsInterceptor }, { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor }],
})
export class AppModule {}
