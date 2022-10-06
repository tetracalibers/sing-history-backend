import { Field, ObjectType, Int } from '@nestjs/graphql';
import { Type } from '@nestjs/common';
import { PageInfo } from './page-info';

export function PaginatedConnection<T>(classRef: Type<T>): any {
  @ObjectType({ isAbstract: true })
  class AbstractConnectionType {
    @Field((type) => Int)
    totalCount: number;

    @Field((type) => [AbstractEdgeType], { nullable: true })
    edges: AbstractEdgeType[];

    @Field((type) => PageInfo)
    pageInfo: PageInfo;
  }

  @ObjectType(`${classRef.name}Edge`)
  abstract class AbstractEdgeType {
    @Field((type) => String)
    cursor: string;

    @Field((type) => classRef)
    node: T;
  }
  return AbstractConnectionType;
}
