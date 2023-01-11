import {
  GetBroadcastEventHistoryDocument,
  useGetBroadcastEventHistoryQuery,
  useSendChatMessageMutation,
  useWatchBroadcastSubscription,
} from '@generated/graphql/operations';
import type {
  GetBroadcastEventHistoryQuery,
  GetBroadcastEventHistoryQueryVariables,
} from '@generated/graphql/operations';
import { useApolloClient } from '@vue/apollo-composable';
import cloneDeep from 'clone-deep';
import { defineStore } from 'pinia';
import { computed } from 'vue';

// type Playbill = WatchBroadcastSubscription['broadcast']['state']['active']['playbill'];

export const useBroadcastStore = defineStore('broadcast', () => {
  const apolloClient = useApolloClient();

  const broadcastEventHistoryQuery = useGetBroadcastEventHistoryQuery();
  const watchBroadcastSubscription = useWatchBroadcastSubscription();

  watchBroadcastSubscription.onResult((result) => {
    if (!result.data) {
      return;
    }

    const { state, event } = result.data.broadcast;
    if (event) {
      apolloClient.client.cache.writeQuery<
        GetBroadcastEventHistoryQuery,
        GetBroadcastEventHistoryQueryVariables
      >({
        query: GetBroadcastEventHistoryDocument,
        data: {
          broadcastEventHistory: {
            events: [...events.value, event],
          },
        },
      });
    }
    if (state) {
      console.log('state', state);
    }
  });

  const events = computed(
    () =>
      broadcastEventHistoryQuery.result.value?.broadcastEventHistory.events ??
      []
  );

  const fetchMoreEvents = async () => {
    if (broadcastEventHistoryQuery.loading.value) {
      // Prevent concurrent fetches.
      return;
    }

    const nextPageCursor =
      broadcastEventHistoryQuery.result.value?.broadcastEventHistory
        .nextPageCursor;
    if (!nextPageCursor) {
      return;
    }

    broadcastEventHistoryQuery.fetchMore({
      variables: {
        cursor: nextPageCursor,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return previousResult;
        }
        const newResult = cloneDeep(previousResult);
        newResult.broadcastEventHistory.events.push(
          ...fetchMoreResult.broadcastEventHistory.events
        );
        newResult.broadcastEventHistory.nextPageCursor =
          fetchMoreResult.broadcastEventHistory.nextPageCursor;
        return newResult;
      },
    });
  };

  const sendMessage = async (text: string) => {
    const { mutate } = useSendChatMessageMutation({
      variables: {
        text,
      },
    });

    await mutate();
  };

  return { events, fetchMoreEvents, sendMessage };
});
