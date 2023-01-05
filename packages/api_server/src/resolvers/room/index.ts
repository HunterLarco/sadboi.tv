import { Resolvers } from '@generated/graphql/room_service/resolvers';

import { resolvers as mappers } from '@/resolvers/room/Mappers';
import { resolvers as mutationResolvers } from '@/resolvers/room/Mutations';
import { resolvers as queryResolvers } from '@/resolvers/room/Queries';
import { resolvers as subscriptionResolvers } from '@/resolvers/room/Subscriptions';

const resolvers: Resolvers = {
  Query: queryResolvers,
  Mutation: mutationResolvers,
  Subscription: subscriptionResolvers,
  ...mappers,
};

export default resolvers;
