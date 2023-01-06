<script setup lang="ts">
import { ref } from 'vue';

import Bootloader from '@/components/Bootloader.vue';
import PreShowBillboard from '@/components/PreShowBillboard.vue';
import SadboiFlourish from '@/components/SadboiFlourish.vue';
import Grid from '@/components/grid/Grid.vue';

const enteredWebsite = ref(false);
</script>

<template>
  <div class="HomePage">
    <Bootloader @enter="enteredWebsite = true" v-show="!enteredWebsite" />

    <template v-if="enteredWebsite">
      <SadboiFlourish class="SadboiFlourish" />
      <PreShowBillboard class="Billboard" />
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

.Billboard {
  flex-grow: 1;
  margin-right: 467px;
  padding-bottom: 70px;
  padding-left: 105px;
  padding-top: 115px;
  position: relative;

  @include sizing-shelf-highdpi {
    margin-right: 419px;
    padding-bottom: 50px;
    padding-left: 85px;
    padding-top: 90px;
  }

  @include sizing-shelf-lowdpi {
    margin-right: 371px;
    padding-bottom: 40px;
    padding-left: 75px;
    padding-top: 80px;
  }
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
