<script setup lang="ts">
import { onMounted, ref } from 'vue';

import { useBroadcastStore } from '@/store/broadcast';
import { useGridStore } from '@/store/grid';

const broadcastStore = useBroadcastStore();
const gridStore = useGridStore();

/// Lifestyle Hooks

const input = ref<HTMLInputElement>();
onMounted(() => {
  input.value?.focus();
});

/// Actions

function sendMessage(event: KeyboardEvent) {
  const target = <HTMLInputElement>event.target;
  broadcastStore.sendMessage(target.value);
  target.value = '';
}
</script>

<template>
  <div class="SendMessageInputBar">
    <div class="Icon" @click="gridStore.page = null">
      <img src="@/assets/images/grid/dock/ChatIcon.svg" />
    </div>
    <input
      type="text"
      ref="input"
      placeholder="Whatcha gotta say?"
      @keydown.enter="sendMessage"
    />
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/layout';
@import '@/styles/fonts';

.SendMessageInputBar {
  @include layout-horizontal;

  & input {
    @include fonts-body;

    background: var(--secondary-background);
    flex-grow: 1;
    outline: none;
    border: none;
    padding: 0 17px;
  }
}

.Icon {
  cursor: pointer;
  flex-shrink: 0;
  width: 50px;
  height: 48px;
  padding: 2px 2px 0 2px;
  position: relative;

  &::before {
    @include layout-fill;

    background: var(--dock-icon-background);
    content: '';
    display: block;
    mix-blend-mode: overlay;
    z-index: -1;
  }

  img {
    width: 100%;
    height: 100%;
  }
}
</style>
