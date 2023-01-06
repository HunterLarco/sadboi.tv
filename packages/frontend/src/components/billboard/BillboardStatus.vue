<script setup lang="ts">
const props = defineProps<{
  status: string;
  flavor?: string;
  icon: string;
}>();
</script>

<template>
  <div class="BillboardStatus">
    <img :src="props.icon" class="Icon" />
    <div class="Status">{{ props.status }}</div>
    <div class="Flavor" v-if="props.flavor">{{ props.flavor }}</div>
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/fonts';
@import '@/styles/sizing_shelves';

.BillboardStatus {
  display: inline-block;

  & > *:not(:last-child) {
    margin-right: 20px;
  }
}

.Icon {
  height: 28px;
  user-select: none;
  vertical-align: middle;

  @include sizing-shelf-highdpi {
    height: 24px;
  }
}

.Status {
  @include fonts-subtitle;

  display: inline-block;
  user-select: none;
  vertical-align: middle;
}

.Flavor {
  @include fonts-subtitle;

  color: rgb(120, 120, 120);
  display: inline-block;
  mix-blend-mode: luminosity;
  vertical-align: middle;
}
</style>
