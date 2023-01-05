import { AuthScopeCode } from '@prisma/client';
import type { User } from '@prisma/client';

import type { GlobalContext } from '@/GlobalContext';
import AuthTokenDataSource from '@/data_sources/AuthTokenDataSource';
import BroadcastEventDataSource from '@/data_sources/BroadcastEventDataSource';
import BroadcastEventPubSub from '@/data_sources/BroadcastEventPubSub';
import UserDataSource from '@/data_sources/UserDataSource';

type DataSources = {
  AuthToken: AuthTokenDataSource;
  BroadcastEvent: BroadcastEventDataSource;
  BroadcastEventPubSub: BroadcastEventPubSub;
  User: UserDataSource;
};

export type RequestContext = {
  actor: User | null;
  dataSources: DataSources;
  globalContext: GlobalContext;
};

export async function createRequestContext(args: {
  globalContext: GlobalContext;
  authorization: string | null;
}): Promise<RequestContext> {
  const { globalContext, authorization } = args;

  const dataSources: DataSources = {
    AuthToken: new AuthTokenDataSource({ prismaClient: globalContext.prisma }),
    BroadcastEvent: new BroadcastEventDataSource({
      prismaClient: globalContext.prisma,
    }),
    BroadcastEventPubSub: new BroadcastEventPubSub(),
    User: new UserDataSource({
      prismaClient: globalContext.prisma,
    }),
  };

  return {
    actor: await getActor(dataSources, authorization),
    dataSources,
    globalContext,
  };
}

async function getActor(
  dataSources: DataSources,
  authorization: string | null
): Promise<User | null> {
  if (!authorization) {
    return null;
  }

  try {
    const [userId] = await dataSources.AuthToken.use({
      id: authorization,
      requiredScopeCodes: [AuthScopeCode.UserAuth],
    });

    return await dataSources.User.getById(userId);
  } catch {
    return null;
  }
}
