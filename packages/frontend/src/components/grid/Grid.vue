<script setup lang="ts">
import Dock from '@/components/grid/Dock.vue';
import Layout from '@/components/grid/Layout.vue';
import ChatPage from '@/components/grid/chat/Page.vue';
import InfoPage from '@/components/grid/info/Page.vue';
import SettingsPage from '@/components/grid/settings/Page.vue';
import { useGridStore } from '@/store/grid';

const gridStore = useGridStore();
</script>

<template>
  <Layout class="Grid Hud">
    <div class="Router">
      <ChatPage v-show="gridStore.page == 'Chat'" />
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

  &.Hud {
    --grid-page-background: #{rgba(#000, 0.5)};
    --grid-titlebar-background: #{rgba(#000, 0.75)};
    --grid-icon-background: none;
    --grid-icon-blend-mode: normal;
    --grid-dock-background: #{rgba(#000, 0.25)};
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
