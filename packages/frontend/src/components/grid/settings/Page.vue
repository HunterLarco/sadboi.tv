<script setup lang="ts">
import SettingsForm from '@/components/grid/settings/SettingsForm.vue';
import TitleBar from '@/components/grid/settings/TitleBar.vue';
</script>

<template>
  <div class="SettingsPage">
    <div class="SettingsForm">
      <SettingsForm />
    </div>
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
  background: #000;
  flex-grow: 1;
  overflow-x: hidden;
  overflow-y: scroll;
}

.InputBar {
  flex-shrink: 0;
}
</style>
