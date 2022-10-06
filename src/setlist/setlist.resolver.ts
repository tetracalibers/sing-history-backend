import { Resolver } from '@nestjs/graphql';
import { Song } from './model/song';

@Resolver((of) => Song)
export class SetlistResolver {}
