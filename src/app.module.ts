import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from './post/post.module';
import { ConfigModule } from '@nestjs/config';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { ExceptionLoggerFilter } from './utils/exceptionLogger.filter';
import { APP_FILTER } from '@nestjs/core';

@Module({
  imports: [PostModule, 
            ConfigModule.forRoot(),
            MongooseModule.forRoot(process.env.MONGODB_URL,{
              useNewUrlParser: true,
              useFindAndModify: false,
              useCreateIndex: true,
            }),
            UserModule
  ],
  controllers: [AppController],
  providers: [AppService,
    // {
    //   provide: APP_FILTER, useClass: ExceptionLoggerFilter,
    // }
],
})
export class AppModule {}
