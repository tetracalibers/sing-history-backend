import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@ArgsType()
export class PaginationArgs {
  @Field((type) => Int, { nullable: true })
  @IsOptional()
  first?: number;

  @Field((type) => String, { nullable: true })
  @IsOptional()
  after?: string;

  @Field((type) => Int, { nullable: true })
  @IsOptional()
  last?: number;

  @Field((type) => String, { nullable: true })
  @IsOptional()
  before?: string;
}
