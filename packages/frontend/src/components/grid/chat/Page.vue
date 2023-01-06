<script setup lang="ts">
import BroadcastEvents from '@/components/grid/chat/BroadcastEvents.vue';
import InputBar from '@/components/grid/chat/InputBar.vue';
</script>

<template>
  <div class="ChatPage">
    <BroadcastEvents class="BroadcastEvents" />
    <InputBar />
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

.InputBar {
  flex-shrink: 0;
}
</style>
