<script setup lang="ts">
import type { GetBroadcastEventHistoryQuery } from '@generated/graphql/operations';

import ChatMessageEvent from '@/components/grid/chat/ChatMessageEvent.vue';

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
  </div>
</template>

<style scoped lang="scss">
.BroadcastEvent {
}
</style>
