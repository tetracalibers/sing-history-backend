import { Injectable } from '@nestjs/common';
import { Song } from './model/song';
import { NewSongInput } from './dto/newSong.input';
import { nanoid } from 'nanoid';

let songs: Song[] = [
  {
    artistId: 671759255,
    artistName: 'サザンオールスターズ',
    createdAt: new Date(),
    id: nanoid(),
    jacketUrl:
      'https://is5-ssl.mzstatic.com/image/thumb/Music3/v4/d2/9d/14/d29d1498-4f74-9330-ff5e-36ba33d0e531/VEATP-31060.jpg/30x30bb.jpg',
    memo: '',
    rating: 0,
    score: 0,
    singDate: '2022-05-31',
    singKey: -4,
    songName: 'TSUNAMI',
    updatedAt: new Date(),
  },
  {
    artistId: 164283721,
    artistName: 'MISIA',
    createdAt: new Date(),
    id: nanoid(),
    jacketUrl:
      'https://is4-ssl.mzstatic.com/image/thumb/Music114/v4/ef/37/f3/ef37f3f0-53d7-7766-00b0-6a5ccb28dc76/source/30x30bb.jpg',
    memo: '',
    rating: 0,
    score: 0,
    singDate: '2022-05-31',
    singKey: 1,
    songName: 'Everything',
    updatedAt: new Date(),
  },
];

@Injectable()
export class SetlistService {
  findAll(): Promise<Song[]> {
    return Promise.resolve(songs);
  }

  findOneById(id: string): Promise<Song> {
    const song = songs.find((song) => song.id === id);
    return Promise.resolve(song);
  }

  create(data: NewSongInput): Promise<Song> {
    const song: Song = {
      ...data,
      id: nanoid(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    songs.push(song);

    return Promise.resolve(song);
  }

  async remove(id: string): Promise<boolean> {
    songs = songs.filter((song) => song.id !== id);
    return true;
  }
}
