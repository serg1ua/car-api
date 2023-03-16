import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarModule } from './car/car.module';
import { OwnerModule } from './owner/owner.module';
import { ManufacturersModule } from './manufacturer/manufacturer.module';
import { Manufacturer } from './manufacturer/manufacturer.entity';
import { Owner } from './owner/owner.entity';
import { Car } from './car/car.entity';
import config from './config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    ScheduleModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('POSTGRES_HOST'),
        port: configService.get<number>('POSTGRES_PORT'),
        username: configService.get<string>('POSTGRES_USER'),
        password: configService.get<string>('POSTGRES_PASSWORD'),
        database: configService.get<string>('POSTGRES_DB'),
        entities: [Car, Manufacturer, Owner],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    CarModule,
    ManufacturersModule,
    OwnerModule,
  ],
})
export class AppModule {}
