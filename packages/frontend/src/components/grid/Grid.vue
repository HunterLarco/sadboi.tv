<script setup lang="ts">
import Dock from '@/components/grid/Dock.vue';
import Layout from '@/components/grid/Layout.vue';
</script>

<template>
  <Layout>
    <div class="Router"></div>
    <Dock />
  </Layout>
</template>

<style scoped lang="scss">
.Router {
  background: #000;
  flex-grow: 1;
}

.Dock {
  flex-shrink: 0;
}
</style>
