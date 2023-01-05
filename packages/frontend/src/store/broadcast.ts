import {
  WatchBroadcastEventHistoryDocument,
  useGetBroadcastEventHistoryQuery,
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

  return { events };
});
