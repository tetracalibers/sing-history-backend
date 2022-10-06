import { Injectable } from '@nestjs/common';
import { Song } from './model/song';
import { NewSongInput } from './dto/newSong.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SetlistService {
  constructor(
    @InjectRepository(Song)
    private songsRepostiory: Repository<Song>,
  ) {}

  findAll(): Promise<Song[]> {
    return this.songsRepostiory.find();
  }

  findOneById(id: number): Promise<Song> {
    return this.songsRepostiory.findOne({ where: { id } });
  }

  async create(data: NewSongInput): Promise<Song> {
    const song = this.songsRepostiory.create(data);
    await this.songsRepostiory.save(song);
    return song;
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.songsRepostiory.delete(id);
    return result.affected > 0;
  }
}
