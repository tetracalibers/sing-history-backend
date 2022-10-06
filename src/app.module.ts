import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MercuriusDriver, MercuriusDriverConfig } from '@nestjs/mercurius';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SetlistModule } from './setlist/setlist.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Song } from './setlist/model/song';

@Module({
  imports: [
    GraphQLModule.forRoot<MercuriusDriverConfig>({
      driver: MercuriusDriver,
      graphiql: process.env.NODE_ENV !== 'production',
      autoSchemaFile: join(process.cwd(), 'src/generated/schema.gql'),
      sortSchema: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 15432,
      username: 'tetcali',
      password: 'passw0rd',
      database: 'singhis',
      entities: [Song],
      synchronize: true,
    }),
    SetlistModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
