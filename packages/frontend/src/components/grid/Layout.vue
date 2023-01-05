<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';

const host = ref();
const safeAreaStyles = ref({
  width: 'unset',
  height: 'unset',
});

/// Lifecycle Hooks

onMounted(() => {
  window.addEventListener('resize', resize);
  resize();
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', resize);
});

/// Actions

function resize() {
  if (!host.value) return;
  const { width, height } = host.value.getBoundingClientRect();
  const gridWidth = Math.floor((width - 2) / 48);
  const gridHeight = Math.floor((height - 2) / 48);
  safeAreaStyles.value.width = `${48 * gridWidth + 2}px`;
  safeAreaStyles.value.height = `${48 * gridHeight + 2}px`;
}
</script>

<template>
  <div class="Layout" ref="host" @click="resize">
    <div class="SafeArea" :style="safeAreaStyles">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/layout';

.Layout {
  @include layout-center;
}

.SafeArea {
  @include layout-vertical;

  position: relative;
}
</style>
