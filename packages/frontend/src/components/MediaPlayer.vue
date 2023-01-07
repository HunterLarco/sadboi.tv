<script setup lang="ts">
import '@mux/mux-player';
</script>

<template>
  <div class="MediaPlayer">
    <mux-player
      playback-id="S5n1D6XcFsEpc00ae01fILuJXUPEkwdJUb01uIqSfUKlbM"
      autoplay
      stream-type="on-demand"
    />
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/layout';

.MediaPlayer {
  & mux-player {
    @include layout-fill;

    --controls: none;
    --media-object-fit: cover;

    &::part(gesture-layer),
    &::part(captions) {
      display: none;
    }
  }
}
</style>
