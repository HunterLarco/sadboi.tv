<script setup lang="ts">
import BroadcastEvents from '@/components/grid/chat/BroadcastEvents.vue';
</script>

<template>
  <div class="ChatPage">
    <BroadcastEvents class="BroadcastEvents" />
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/layout';
@import '@/styles/fonts';

.ChatPage {
  @include layout-vertical;

  height: 100%;
}

.BroadcastEvents {
  flex-grow: 1;
  overflow: hidden;
}
</style>
