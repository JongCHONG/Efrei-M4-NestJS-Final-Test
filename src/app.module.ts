import { AppRoutingModule } from './app.routing-module';
import { ConfigurationModule } from './infrastructure/configuration/configuration.module';
import { DatabaseModule } from './infrastructure/database/database.module';
import { Module } from '@nestjs/common';


@Module({
    imports: [
        AppRoutingModule,
        ConfigurationModule,
        DatabaseModule,
    ],
})
export class AppModule {}
