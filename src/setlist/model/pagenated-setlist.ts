import { ObjectType } from '@nestjs/graphql';
import { PaginatedConnection } from 'src/pagenation/model/pagenated-connection';
import { Song } from './song';

@ObjectType()
export class PaginatedSetlist extends PaginatedConnection(Song) {}
