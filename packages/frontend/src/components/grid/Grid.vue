<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';

import Dock from '@/components/grid/Dock.vue';
import Layout from '@/components/grid/Layout.vue';
import ChatPage from '@/components/grid/chat/Page.vue';
import InfoPage from '@/components/grid/info/Page.vue';
import SettingsPage from '@/components/grid/settings/Page.vue';
import { useGridStore } from '@/store/grid';

const gridStore = useGridStore();

const mouseInsideGrid = ref(false);
const hideTimeout = ref<ReturnType<typeof setTimeout>>();
const hostStyles = ref({
  opacity: 0,
  transition: '',
});

/// Lifecycle Hooks

onMounted(() => {
  window.addEventListener('mousemove', onMouseMove);
});

onBeforeUnmount(() => {
  window.removeEventListener('mousemove', onMouseMove);
});

/// Event Listeners

function onMouseMove() {
  clearTimeout(hideTimeout.value);
  show(true);
  hideTimeout.value = setTimeout(() => {
    if (!mouseInsideGrid.value) {
      hide(true);
    }
  }, 1000);
}

function onMouseInsideGrid() {
  if (!mouseInsideGrid.value) {
    mouseInsideGrid.value = true;
  }
}

function onMouseLeave() {
  mouseInsideGrid.value = false;
}

/// Actions

function show(animate: boolean) {
  hostStyles.value.opacity = 1;
  hostStyles.value.transition = animate ? 'opacity 250ms' : '';
}

function hide(animate: boolean) {
  hostStyles.value.opacity = 0;
  hostStyles.value.transition = animate ? 'opacity 250ms' : '';
}
</script>

<template>
  <Layout
    class="Grid Hud"
    @mousemove="onMouseInsideGrid"
    @mouseleave="onMouseLeave"
    :style="hostStyles"
  >
    <div class="Router">
      <ChatPage v-if="gridStore.page == 'Chat'" />
      <SettingsPage v-if="gridStore.page == 'Settings'" />
      <InfoPage v-if="gridStore.page == 'Info'" />
    </div>
    <Dock />
  </Layout>
</template>

<style scoped lang="scss">
.Grid {
  --grid-page-background: #000;
  --grid-titlebar-background: #1e1d1e;
  --grid-icon-background: #fff;
  --grid-icon-blend-mode: overlay;
  --grid-dock-background: repeat 25px 25px
    url('@/assets/images/GridOutline.svg');
  --grid-input-border: #1e1d1e;

  &.Hud {
    --grid-page-background: #{rgba(#000, 0.5)};
    --grid-titlebar-background: #{rgba(#000, 0.75)};
    --grid-icon-background: none;
    --grid-icon-blend-mode: normal;
    --grid-dock-background: #{rgba(#000, 0.25)};
    --grid-input-border: #{rgba(#fff, 0.25)};
  }
}

.Router {
  flex-grow: 1;
  overflow: hidden;
}

.Dock {
  flex-shrink: 0;
}
</style>
