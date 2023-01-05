<script setup lang="ts">
import type { GetBroadcastEventHistoryQuery } from '@generated/graphql/operations';

import ChatMessageEvent from '@/components/grid/chat/ChatMessageEvent.vue';
import UserHandleChangeEvent from '@/components/grid/chat/UserHandleChangeEvent.vue';

type BroadcastEvent =
  GetBroadcastEventHistoryQuery['broadcastEventHistory']['events'][number];

const props = defineProps<{
  event: BroadcastEvent;
}>();
</script>

<template>
  <div class="BroadcastEvent">
    <ChatMessageEvent
      :event="props.event"
      v-if="props.event.details.chatMessage"
    />

    <UserHandleChangeEvent
      :event="props.event"
      v-if="props.event.details.userHandleChange"
    />
  </div>
</template>

<style scoped lang="scss">
.BroadcastEvent {
  margin: 10px 22px;
}
</style>
