<script setup lang="ts">
const props = defineProps<{
  text: string;
}>();
</script>

<template>
  <div class="BillboardTitle">{{ props.text }}</div>
</template>

<style scoped lang="scss">
@import '@/styles/fonts';
@import '@/styles/sizing_shelves';

.BillboardTitle {
  @include fonts-title;

  padding-top: 62px;

  @include sizing-shelf-highdpi {
    padding-top: 45px;
  }
}
</style>
