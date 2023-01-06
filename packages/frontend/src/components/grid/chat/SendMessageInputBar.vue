<script setup lang="ts">
import { useBroadcastStore } from '@/store/broadcast';

const broadcastStore = useBroadcastStore();

/// Actions

function sendMessage(event: KeyboardEvent) {
  const target = <HTMLInputElement>event.target;
  broadcastStore.sendMessage(target.value);
  target.value = '';
}
</script>

<template>
  <div class="SendMessageInputBar">
    <input
      type="text"
      placeholder="Whatcha gotta say?"
      @keydown.enter="sendMessage"
    />
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/layout';
@import '@/styles/fonts';

.SendMessageInputBar {
  @include layout-vertical;

  background: #1e1d1e;
  height: 48px;

  & input {
    @include fonts-body;

    flex-grow: 1;
    background: none;
    outline: none;
    border: none;
    padding: 0 17px;
  }
}
</style>
