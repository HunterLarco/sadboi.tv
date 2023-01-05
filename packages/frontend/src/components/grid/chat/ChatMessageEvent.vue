<script setup lang="ts">
import type { GetBroadcastEventHistoryQuery } from '@generated/graphql/operations';
import { computed } from 'vue';

import UserHandle from '@/components/UserHandle.vue';

type BroadcastEvent =
  GetBroadcastEventHistoryQuery['broadcastEventHistory']['events'][number];

const props = defineProps<{
  event: BroadcastEvent;
}>();

const message = computed(() => props.event.details.chatMessage!);
</script>

<template>
  <div class="ChatMessageEvent">
    <div class="Text">
      <UserHandle class="UserHandle" :handle="message.preservedHandle" />
      <span class="Payload">{{ message.payload.text?.value }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/fonts';

.ChatMessageEvent {
}

.Text {
  word-break: break-word;
}

.UserHandle {
  margin-right: 10px;
}

.Payload {
  @include fonts-collapsed-body;
}
</style>
