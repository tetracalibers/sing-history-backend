import { Injectable } from '@nestjs/common';
import { Song } from './model/song';
import { NewSongInput } from './dto/newSong.input';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, MoreThan, Repository } from 'typeorm';
import { PaginatedSetlistArgs } from './dto/pagenated-setlist.args';
import { PaginatedSetlist } from './model/pagenated-setlist';

@Injectable()
export class SetlistService {
  constructor(
    @InjectRepository(Song)
    private songsRepostiory: Repository<Song>,
  ) {}

  findAll(): Promise<Song[]> {
    return this.songsRepostiory.find();
  }

  async findAllPerPage(args: PaginatedSetlistArgs): Promise<PaginatedSetlist> {
    const defautlLimit = 25;

    const query = this.songsRepostiory
      .createQueryBuilder()
      .select()
      .orderBy({ id: 'ASC' });

    const totalCount = await query.getCount();

    const beforeCountQuery = query.clone();
    const afterCountQuery = query.clone();

    if (args.after) {
      // 次のページをリクエストされた場合
      const limit = args.first ?? defautlLimit;
      query.where({ id: MoreThan(args.after) }).take(limit);
    } else if (args.before) {
      // 前のページをリクエストされた場合
      const limit = args.last ?? defautlLimit;
      query.where({ id: LessThan(args.before) }).take(limit);
    } else if (args.first) {
      // 最初のページをリクエストされた場合
      query.take(args.first);
    } else if (args.last) {
      // 最後のページをリクエストされた場合（多分使わない）
      const maxIdRecord = await query.clone().orderBy({ id: 'DESC' }).getOne();
      query.where({ id: MoreThan(maxIdRecord.id - args.last) });
    }

    const nodes = await query.getMany();
    const edges = nodes.map((node) => ({ cursor: node.id, node }));

    const startCursor = nodes[0].id;
    const endCursor = nodes[nodes.length - 1].id;

    const countBefore = await beforeCountQuery
      .where('id < :startCursor', {
        startCursor,
      })
      .getCount();
    const countAfter = await afterCountQuery
      .where('id > :endCursor', {
        endCursor,
      })
      .getCount();

    const hasNextPage = countAfter > 0;
    const hasPreviousPage = countBefore > 0;

    const pageInfo = { startCursor, endCursor, hasNextPage, hasPreviousPage };

    return { edges, pageInfo, totalCount };
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
