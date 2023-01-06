<script setup lang="ts">
import TitleBar from '@/components/grid/settings/TitleBar.vue';
</script>

<template>
  <div class="SettingsPage">
    <div class="SettingsForm" />
    <TitleBar />
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/layout';
@import '@/styles/fonts';

.SettingsPage {
  @include layout-vertical;

  height: 100%;
}

.SettingsForm {
  flex-grow: 1;
  overflow: hidden;
}

.InputBar {
  flex-shrink: 0;
}
</style>
