import ApiTypeDefs from '@generated/graphql/ast';
import { mergeResolvers } from '@graphql-tools/merge';
import { makeExecutableSchema } from '@graphql-tools/schema';
import * as graphqlScalars from 'graphql-scalars';

import RoomResolvers from '@/resolvers/room';
import UserResolvers from '@/resolvers/user';

export default makeExecutableSchema({
  typeDefs: [ApiTypeDefs, ...graphqlScalars.typeDefs],
  resolvers: mergeResolvers([
    RoomResolvers,
    UserResolvers,
    graphqlScalars.resolvers,
  ]),
});
