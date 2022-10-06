import { PaginatedSetlist } from './model/pagenated-setlist';
import { NotFoundException } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Song } from './model/song';
import { SetlistService } from './setlist.service';
import { NewSongInput } from './dto/newSong.input';
import { PaginatedSetlistArgs } from './dto/pagenated-setlist.args';

@Resolver((of) => Song)
export class SetlistResolver {
  constructor(private setlistService: SetlistService) {}

  @Query((returns) => [Song])
  setlist(): Promise<Song[]> {
    return this.setlistService.findAll();
  }

  @Query((returns) => PaginatedSetlist)
  setlistPerPage(
    @Args() args: PaginatedSetlistArgs,
  ): Promise<PaginatedSetlist> {
    return this.setlistService.findPagenatedAll(args);
  }

  @Query((returns) => Song)
  async song(@Args({ name: 'id', type: () => Int }) id: number) {
    const song = await this.setlistService.findOneById(id);
    if (!song) {
      throw new NotFoundException(id);
    }
    return song;
  }

  @Mutation((returns) => Song)
  addSong(@Args('newSong') newSong: NewSongInput): Promise<Song> {
    return this.setlistService.create(newSong);
  }

  @Mutation((returns) => Boolean)
  async removeSong(@Args({ name: 'id', type: () => Int }) id: number) {
    return this.setlistService.remove(id);
  }
}
