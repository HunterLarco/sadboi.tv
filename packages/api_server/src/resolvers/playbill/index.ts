import { Resolvers } from '@generated/graphql/playbill_service/resolvers';

import { resolvers as mappers } from '@/resolvers/playbill/Mappers';

const resolvers: Resolvers = {
  ...mappers,
};

export default resolvers;
