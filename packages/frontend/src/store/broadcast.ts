import {
  WatchBroadcastEventHistoryDocument,
  useGetBroadcastEventHistoryQuery,
  useSendChatMessageMutation,
} from '@generated/graphql/operations';
import type {
  WatchBroadcastEventHistorySubscription,
  WatchBroadcastEventHistorySubscriptionVariables,
} from '@generated/graphql/operations';
import cloneDeep from 'clone-deep';
import { defineStore } from 'pinia';
import { computed } from 'vue';

export const useBroadcastStore = defineStore('broadcast', () => {
  const broadcastEventHistoryQuery = useGetBroadcastEventHistoryQuery();

  broadcastEventHistoryQuery.subscribeToMore<
    WatchBroadcastEventHistorySubscription,
    WatchBroadcastEventHistorySubscriptionVariables
  >(() => ({
    document: WatchBroadcastEventHistoryDocument,
    updateQuery(previousResult, { subscriptionData }) {
      const newResult = cloneDeep(previousResult);
      newResult.broadcastEventHistory.events.unshift(
        subscriptionData.data.broadcastEvent
      );
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
