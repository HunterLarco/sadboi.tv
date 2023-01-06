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
    <UserHandle
      :user-id="message.author.id"
      :handle="message.preservedHandle"
    />
    {{ message.payload.text?.value }}
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/fonts';

.ChatMessageEvent {
  @include fonts-collapsed-body;

  word-break: break-word;
}
</style>
