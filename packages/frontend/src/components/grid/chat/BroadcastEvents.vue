<script setup lang="ts">
import BroadcastEvent from '@/components/grid/chat/BroadcastEvent.vue';
import { useBroadcastStore } from '@/store/broadcast';

const broadcastStore = useBroadcastStore();
</script>

<template>
  <div class="BroadcastEvents">
    <BroadcastEvent
      :event="event"
      v-for="event of broadcastStore.events"
      :key="event.id"
    />
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/fonts';

.BroadcastEvents {
  @include fonts-collapsed-body;

  background: #000;
}
</style>
