<script setup lang="ts">
import { ref } from 'vue';

import Bootloader from '@/components/Bootloader.vue';
import SadboiFlourish from '@/components/SadboiFlourish.vue';
import Grid from '@/components/grid/Grid.vue';

const enteredWebsite = ref(false);
</script>

<template>
  <div class="HomePage">
    <Bootloader @enter="enteredWebsite = true" v-if="!enteredWebsite" />

    <template v-if="enteredWebsite">
      <SadboiFlourish class="SadboiFlourish" />
      <Grid class="Grid" />
    </template>
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
