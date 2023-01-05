import { Resolvers } from '@generated/graphql/broadcast_service/resolvers';

import { resolvers as mappers } from '@/resolvers/broadcast/Mappers';
import { resolvers as mutationResolvers } from '@/resolvers/broadcast/Mutations';
import { resolvers as queryResolvers } from '@/resolvers/broadcast/Queries';
import { resolvers as subscriptionResolvers } from '@/resolvers/broadcast/Subscriptions';

const resolvers: Resolvers = {
  Query: queryResolvers,
  Mutation: mutationResolvers,
  Subscription: subscriptionResolvers,
  ...mappers,
};

export default resolvers;
