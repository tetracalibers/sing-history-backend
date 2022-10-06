import { Field, InputType, Int } from '@nestjs/graphql';
import { Max, Min, IsOptional } from 'class-validator';

@InputType()
export class NewSongInput {
  @Field((type) => [String])
  artistId: string;

  @Field((type) => [String])
  songName: string;

  @Field((type) => [String], { nullable: true })
  @IsOptional()
  jacketUrl?: string;

  @Field((type) => Int, { defaultValue: 0 })
  @Min(-6)
  @Max(6)
  singKey: number;

  @Field((type) => Int, { defaultValue: 0 })
  @Min(0)
  @Max(5)
  rating: number;

  @Field((type) => Int, { nullable: true })
  @IsOptional()
  @Min(0)
  @Max(100)
  score?: number;

  @Field((type) => [String], { nullable: true })
  @IsOptional()
  memo?: string;
}
