<script setup lang="ts">
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
import { computed, ref } from 'vue';

/// Form Data

const text = ref('');

/// Queries

const queries = {
  getBroadcastEventHistory: useGetBroadcastEventHistoryQuery(),
};

const broadcastEventHistory = computed(
  () => queries.getBroadcastEventHistory.result.value?.broadcastEventHistory
);

/// Subscriptions

queries.getBroadcastEventHistory.subscribeToMore<
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

/// Actions

function loadBroadcastEventHistoryNextPage() {
  if (!broadcastEventHistory.value?.nextPageCursor) {
    return;
  }

  queries.getBroadcastEventHistory.fetchMore({
    variables: {
      cursor: broadcastEventHistory.value.nextPageCursor,
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
}

function sendChatMessage() {
  const { mutate } = useSendChatMessageMutation({
    variables: {
      text: text.value,
    },
  });

  mutate();
  text.value = '';
}
</script>

<template>
  <div class="HomePage">
    <div class="Left">
      <pre>{{ broadcastEventHistory?.events }}</pre>
      <button
        @click="loadBroadcastEventHistoryNextPage"
        v-if="broadcastEventHistory?.nextPageCursor"
      >
        Load More
      </button>
    </div>

    <div class="Right">
      <input
        v-model="text"
        @keydown.enter="sendChatMessage"
        placeholder="chat message"
      />
      <button @click="sendChatMessage">Send</button>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/layout';

.HomePage {
  @include layout-fill;
  @include layout-horizontal;

  b {
    font-weight: 700;
  }
}

.Left {
  flex: 1;
  overflow-x: hidden;
  overflow-y: scroll;
}

.Right {
  flex: 1;
  overflow-x: hidden;
  overflow-y: scroll;
}
</style>
