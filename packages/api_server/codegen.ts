import type { CodegenConfig } from '@graphql-codegen/cli';

const kMappers = {
  MessageLog: '@prisma/client#MessageHistory as MessageHistoryModel',
  User: '@prisma/client#User as UserModel',
  Viewer: '@prisma/client#User as UserModel',
  UserHandle: '@prisma/client#UserHandle as UserHandleModel',
  UserHandleColor: '@prisma/client#UserHandleColor as UserHandleColorModel',
  UserBadge: '@prisma/client#UserBadge as UserBadgeModel',
};

const kResolverConfig = {
  contextType: '@/RequestContext#RequestContext',
  mappers: kMappers,
};

const kServiceList = ['ping_pong_service', 'room_service', 'user_service'];

const config: CodegenConfig = {
  generates: {
    './generated/graphql/ast.ts': {
      schema: './graphql/**/*.graphql',
      plugins: ['@ping-pong/generate_graphql_ast'],
    },
    './generated/graphql/resolvers.ts': {
      schema: './graphql/**/*.graphql',
      plugins: ['typescript', 'typescript-resolvers'],
      config: kResolverConfig,
    },
  },
};

for (const serviceName of kServiceList) {
  config.generates[`./generated/graphql/${serviceName}/resolvers.ts`] = {
    schema: `./graphql/${serviceName}/**/*.graphql`,
    plugins: ['typescript', 'typescript-resolvers'],
    config: kResolverConfig,
  };
}

export default config;
