import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { ValidationPipe } from '@nestjs/common';
import { IoAdapter } from '@nestjs/platform-socket.io';
// In main.ts (for NestJS)
import * as compression from 'compression';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  app.use(compression());
  app.enableCors({
    origin: 'http://localhost:5173', // your Vite/React/Frontend dev server
    credentials: true, // if you're sending cookies
  });

 const user = 'guest'
 const password = 'guest'
 const host = "localhost:5672"
 const queueName = "nest_query"

//  await app.connectMicroservice<MicroserviceOptions>({
//    transport: Transport.RMQ,
//    options: {
//      urls: [`amqp://${user}:${password}@${host}`],
//      queue: queueName,
//      queueOptions: {
//        durable: true,
//      },
//    },
//  });

 app.startAllMicroservices();



  app.useWebSocketAdapter(new IoAdapter(app));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
