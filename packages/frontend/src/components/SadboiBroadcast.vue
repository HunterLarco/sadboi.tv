<script setup lang="ts">
import MediaPlayer from '@/components/MediaPlayer.vue';
import PreShowBillboard from '@/components/PreShowBillboard.vue';
import Retroscape from '@/components/Retroscape.vue';
import SadboiFlourish from '@/components/SadboiFlourish.vue';
import Grid from '@/components/grid/Grid.vue';
</script>

<template>
  <div class="SadboiBroadcast">
    <Retroscape />
    <SadboiFlourish class="SadboiFlourish" />
    <PreShowBillboard class="Billboard" />
    <MediaPlayer class="MediaPlayer" />
    <Grid class="Grid" />
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/layout';
@import '@/styles/sizing_shelves';

.SadboiBroadcast {
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

.MediaPlayer {
  @include layout-fill;
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
