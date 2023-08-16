import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppNestiaController } from './app-nestia.controller';

@Module({
  imports: [],
  controllers: [AppController, AppNestiaController],
  providers: [AppService],
})
export class AppModule {}
