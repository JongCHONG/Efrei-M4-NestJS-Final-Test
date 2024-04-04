import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:24000/nestjs-final-test-db'),
  ],
})
export class DatabaseModule {}