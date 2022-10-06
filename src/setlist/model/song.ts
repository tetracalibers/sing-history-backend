import { Field, ID, ObjectType, Int } from '@nestjs/graphql';

// ObjectTypeデコレータを使用することで、定義したmodelを元にschemaが自動生成される
@ObjectType()
export class Song {
  // schame上、ID型にしたいため、ReturnTypeFuncを引数に与える
  // ReturnTypeFuncを引数に与えない場合、idの型はString型になる
  @Field((type) => ID)
  id: string;

  @Field()
  artistId: string;

  @Field()
  songName: string;

  // nullを許容するためオプションを指定
  // オプションを指定しない限り、nullは許容されない（String!型になる）
  @Field({ nullable: true })
  jacketUrl?: string;

  @Field((type) => Int, { defaultValue: 0 })
  singKey: number;

  @Field((type) => Int, { defaultValue: 0 })
  rating: number;

  @Field((type) => Int, { nullable: true })
  score?: number;

  @Field({ nullable: true })
  memo?: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
