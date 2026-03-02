import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { requestIdMiddleware } from './common/request-id.middleware';
import { logger } from './common/logger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule,{ bufferLogs: true });
 app.enableCors(
    {origin: '*', 
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed HTTP methods
      allowedHeaders: 'Content-Type, Accept', // Allowed headers
    }
 );
  app.use(requestIdMiddleware);
  await app.listen(process.env.PORT ?? 3001);
   logger.info('CloudOps Backend started on port ' + (process.env.PORT ?? 3001));

  process.on('SIGTERM', async () => {
    logger.warn('SIGTERM received. Graceful shutdown...');
    await app.close();
    process.exit(0);
  });
  
}
bootstrap();
