import { Field, ID, ObjectType, Int } from '@nestjs/graphql';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
// ObjectTypeデコレータを使用することで、定義したmodelを元にschemaが自動生成される
@ObjectType()
export class Song {
  @PrimaryGeneratedColumn('increment', { type: 'int' })
  // schame上、ID型にしたいため、ReturnTypeFuncを引数に与える
  // ReturnTypeFuncを引数に与えない場合、idの型はString型になる
  @Field((type) => ID)
  id: number;

  @Column({ type: 'int', unsigned: true })
  @Field((type) => Int)
  artistId: number;

  @Column()
  @Field()
  artistName: string;

  @Column()
  @Field()
  songName: string;

  @Column({ nullable: true })
  // nullを許容するためオプションを指定
  // オプションを指定しない限り、nullは許容されない（String!型になる）
  @Field({ nullable: true })
  jacketUrl?: string;

  @Column()
  @Field()
  singDate: string;

  @Column({ type: 'int', default: 0 })
  @Field((type) => Int, { defaultValue: 0 })
  singKey: number;

  @Column({ type: 'int', default: 0, unsigned: true })
  @Field((type) => Int, { defaultValue: 0 })
  rating: number;

  @Column({ type: 'int', unsigned: true, nullable: true })
  @Field((type) => Int, { nullable: true })
  score?: number;

  @Column({ nullable: true })
  @Field({ nullable: true })
  memo?: string;

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @UpdateDateColumn()
  @Field()
  updatedAt: Date;
}
