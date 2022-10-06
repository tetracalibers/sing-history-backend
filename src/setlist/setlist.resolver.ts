import { NotFoundException } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Song } from './model/song';
import { SetlistService } from './setlist.service';
import { NewSongInput } from './dto/newSong.input';

@Resolver((of) => Song)
export class SetlistResolver {
  constructor(private songsService: SetlistService) {}

  @Query((returns) => [Song])
  songs(): Promise<Song[]> {
    return this.songsService.findAll();
  }

  @Query((returns) => Song)
  async getSong(@Args({ name: 'id', type: () => Int }) id: string) {
    const song = await this.songsService.findOneById(id);
    if (!song) {
      throw new NotFoundException(id);
    }
    return song;
  }

  @Mutation((returns) => Song)
  addSong(@Args('newSong') newSong: NewSongInput): Promise<Song> {
    return this.songsService.create(newSong);
  }

  @Mutation((returns) => Boolean)
  async removeSong(@Args({ name: 'id', type: () => Int }) id: string) {
    return this.songsService.remove(id);
  }
}
