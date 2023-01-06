<script setup lang="ts">
import Dock from '@/components/grid/Dock.vue';
import Layout from '@/components/grid/Layout.vue';
import ChatPage from '@/components/grid/chat/Page.vue';
import InfoPage from '@/components/grid/info/Page.vue';
import { useGridStore } from '@/store/grid';

const gridStore = useGridStore();
</script>

<template>
  <Layout>
    <div class="Router">
      <ChatPage v-show="gridStore.page == 'Chat'" />
      <InfoPage v-show="gridStore.page == 'Info'" />
    </div>
    <Dock />
  </Layout>
</template>

<style scoped lang="scss">
.Router {
  flex-grow: 1;
  overflow: hidden;
}

.Dock {
  flex-shrink: 0;
}
</style>
