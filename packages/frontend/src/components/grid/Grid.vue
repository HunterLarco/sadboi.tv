<script setup lang="ts">
import Dock from '@/components/grid/Dock.vue';
import Layout from '@/components/grid/Layout.vue';
import InfoPage from '@/components/grid/info/Page.vue';
import * as gridStore from '@/store/grid';
</script>

<template>
  <Layout>
    <div class="Router">
      <InfoPage v-if="gridStore.page.value == 'Info'" />
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
