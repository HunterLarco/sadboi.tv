import type { CodegenConfig } from '@graphql-codegen/cli';

const kMappers = {
  BroadcastEvent: '@prisma/client#BroadcastEvent as BroadcastEventModel',
  BroadcastEventDetails:
    '@prisma/client#BroadcastEventDetails as BroadcastEventDetailsModel',
  ChatMessageEvent: '@prisma/client#ChatMessageEvent as ChatMessageEventModel',
  ChatMessagePayload:
    '@prisma/client#ChatMessagePayload as ChatMessagePayloadModel',
  ChatMessageTextPayload:
    '@prisma/client#ChatMessageTextPayload as ChatMessageTextPayloadModel',
  User: '@prisma/client#User as UserModel',
  UserBadge: '@prisma/client#UserBadge as UserBadgeModel',
  UserEnterChatEvent:
    '@prisma/client#UserEnterChatEvent as UserEnterChatEventModel',
  UserHandle: '@prisma/client#UserHandle as UserHandleModel',
  UserHandleChangeEvent:
    '@prisma/client#UserHandleChangeEvent as UserHandleChangeEventModel',
  UserHandleColor: '@prisma/client#UserHandleColor as UserHandleColorModel',
  Viewer: '@prisma/client#User as UserModel',
};

const kResolverConfig = {
  contextType: '@/RequestContext#RequestContext',
  mappers: kMappers,
};

const kServiceList = [
  'broadcast_service',
  'debug_service',
  'playbill_service',
  'user_service',
];

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
