import { Module } from '@nestjs/common';
import { SetlistService } from './setlist.service';
import { SetlistResolver } from './setlist.resolver';

@Module({
  providers: [SetlistService, SetlistResolver],
})
export class SetlistModule {}
