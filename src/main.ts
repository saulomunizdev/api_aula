import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  )
  
  
  // inicio codigo para criar a documentação da API
  const config = new DocumentBuilder()
  .setTitle( 'API Filmes e series - StreamingAPI')
  .setDescription(
    'A presente API tem como objetivo simular cadastros possíveis para uma API de Stream de filmes e series',
  )
  .setVersion('1.0')
  .addTag('usuario')
  .addTag('filme')
  .addTag('serie')
  .addTag('instituicao')
  .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  //Final do codigo documentação API

  useContainer(app.select(AppModule),{fallbackOnErrors:true})

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
