<script setup lang="ts">
import '@mux/mux-player';

/*
import type MuxPlayerElement from '@mux/mux-player';
import { computed, ref, shallowRef } from 'vue';

/// Player Management
///
/// We always retain two players, one currently playing and one up next. This
/// way we can buffer content prior to it playing.

const playerA = shallowRef<MuxPlayerElement>();
const playerB = shallowRef<MuxPlayerElement>();

const useFirstPlayer = ref(false);
const currentPlayer = computed(() =>
  useFirstPlayer.value ? playerA.value! : playerB.value!
);
const upNextPlayer = computed(() =>
  useFirstPlayer.value ? playerB.value! : playerA.value!
);

/// Actions

function queueNextMedia() {
  const player = upNextPlayer.value;
  player.playbackId = 'S5n1D6XcFsEpc00ae01fILuJXUPEkwdJUb01uIqSfUKlbM';
}

function playNext() {
  currentPlayer.value!.pause();
  upNextPlayer.value!.play();
  useFirstPlayer.value = !useFirstPlayer.value;
}
*/
</script>

<template>
  <div class="MediaPlayer">
    <!--
    <mux-player stream-type="on-demand" ref="playerA" v-show="useFirstPlayer" />
    <mux-player
      stream-type="on-demand"
      ref="playerB"
      v-show="!useFirstPlayer"
    />
    -->
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
