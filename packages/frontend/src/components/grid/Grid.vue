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
  --primary-background: #000;
  --secondary-background: #1E1D1E;
  --dock-icon-background: #FFF;

  &.Hud {
    --primary-background: #{rgba(#000, 0.5)};
    --secondary-background: #{rgba(#000, 0.75)};
    --dock-icon-background: ${rgba(#000, 0.25)};
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
