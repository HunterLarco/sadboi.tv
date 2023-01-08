import {
  WatchBroadcastDocument,
  useGetBroadcastEventHistoryQuery,
  useSendChatMessageMutation,
} from '@generated/graphql/operations';
import type {
  WatchBroadcastSubscription,
  WatchBroadcastSubscriptionVariables,
} from '@generated/graphql/operations';
import cloneDeep from 'clone-deep';
import { defineStore } from 'pinia';
import { computed } from 'vue';

export const useBroadcastStore = defineStore('broadcast', () => {
  const broadcastEventHistoryQuery = useGetBroadcastEventHistoryQuery();

  broadcastEventHistoryQuery.subscribeToMore<
    WatchBroadcastSubscription,
    WatchBroadcastSubscriptionVariables
  >(() => ({
    document: WatchBroadcastDocument,
    updateQuery(previousResult, { subscriptionData }) {
      const newResult = cloneDeep(previousResult);
      const { event } = subscriptionData.data.broadcast;
      if (event) {
        newResult.broadcastEventHistory.events.unshift(event);
      }
      return newResult;
    },
  }));

  const events = computed(
    () =>
      broadcastEventHistoryQuery.result.value?.broadcastEventHistory.events ??
      []
  );

  const fetchMoreEvents = async () => {
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
