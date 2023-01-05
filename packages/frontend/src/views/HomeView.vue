<script setup lang="ts">
import Retroscape from '@/components/Retroscape.vue';
import SadboiFlourish from '@/components/SadboiFlourish.vue';
import Grid from '@/components/grid/Grid.vue';
</script>

<template>
  <div class="HomePage">
    <Retroscape />

    <SadboiFlourish class="SadboiFlourish" />

    <Grid class="Grid" />
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/layout';
@import '@/styles/sizing_shelves';

.HomePage {
  @include layout-fill;
  @include layout-horizontal;
}

.SadboiFlourish {
  flex-shrink: 0;
}

.Grid {
  bottom: 20px;
  position: absolute;
  right: 35px;
  top: 20px;
  width: 432px;

  @include sizing-shelf-highdpi {
    width: 384px;
  }

  @include sizing-shelf-lowdpi {
    width: 336px;
  }
}
</style>
