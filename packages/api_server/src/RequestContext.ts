import { AuthScopeCode } from '@prisma/client';
import type { User } from '@prisma/client';

import type { GlobalContext } from '@/GlobalContext';
import AuthTokenDataSource from '@/data_sources/AuthTokenDataSource';
import UserDataSource from '@/data_sources/UserDataSource';
import WaitingRoomPubSub from '@/data_sources/WaitingRoomPubSub';

type DataSources = {
  AuthToken: AuthTokenDataSource;
  User: UserDataSource;
  WaitingRoomPubSub: WaitingRoomPubSub;
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
    User: new UserDataSource({
      prismaClient: globalContext.prisma,
    }),
    WaitingRoomPubSub: new WaitingRoomPubSub(),
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
