<script setup lang="ts">
import { storeToRefs } from 'pinia';

import { useBroadcastStore } from '@/store/broadcast';

const broadcastStore = useBroadcastStore();
const { events } = storeToRefs(broadcastStore);
</script>

<template>
  <div class="BroadcastEvents">
    <pre>{{ events }}</pre>
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/fonts';

.BroadcastEvents {
  @include fonts-collapsed-body;

  background: #000;
}
</style>
