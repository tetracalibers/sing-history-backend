import { ArgsType } from '@nestjs/graphql';
import { PaginationArgs } from 'src/pagenation/dto/pagenation.args';

@ArgsType()
export class PaginatedSetlistArgs extends PaginationArgs {}
