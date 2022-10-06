import { Module } from '@nestjs/common';
import { SetlistService } from './setlist.service';
import { SetlistResolver } from './setlist.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Song } from './model/song';

@Module({
  imports: [TypeOrmModule.forFeature([Song])],
  providers: [SetlistService, SetlistResolver],
})
export class SetlistModule {}
