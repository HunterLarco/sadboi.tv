<script setup lang="ts">
import { storeToRefs } from 'pinia';

import Dock from '@/components/grid/Dock.vue';
import Layout from '@/components/grid/Layout.vue';
import InfoPage from '@/components/grid/info/Page.vue';
import { useGridStore } from '@/store/grid';

const gridStore = useGridStore();
const { page: gridPage } = storeToRefs(gridStore);
</script>

<template>
  <Layout>
    <div class="Router">
      <InfoPage v-if="gridPage == 'Info'" />
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
