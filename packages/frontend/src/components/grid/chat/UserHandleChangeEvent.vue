<script setup lang="ts">
import type { GetBroadcastEventHistoryQuery } from '@generated/graphql/operations';
import { computed } from 'vue';

import UserHandle from '@/components/UserHandle.vue';

type BroadcastEvent =
  GetBroadcastEventHistoryQuery['broadcastEventHistory']['events'][number];

const props = defineProps<{
  event: BroadcastEvent;
}>();

const handleChange = computed(() => props.event.details.userHandleChange!);
</script>

<template>
  <div class="UserHandleChangeEvent">
    <UserHandle :handle="handleChange.before" />
    has changed their handle to
    <UserHandle :handle="handleChange.after" />
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/fonts';

.UserHandleChangeEvent {
  @include fonts-notes;

  opacity: 0.35;
}
</style>
