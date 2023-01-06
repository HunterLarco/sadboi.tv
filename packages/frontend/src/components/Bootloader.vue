<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';

import { useUserStore } from '@/store/user';

const userStore = useUserStore();

const emit = defineEmits(['enter']);

/// Real progress bar.

const progress = computed(
  () => fakeProgress.value + (userStore.completedInitialLoad ? 0.2 : 0)
);

/// Fake progress bar.

const fakeProgress = ref(0);

onMounted(() => {
  increaseProgressBar();
});

function increaseProgressBar() {
  fakeProgress.value += Math.random() * 0.05;

  if (fakeProgress.value >= 0.8) {
    fakeProgress.value = 0.8;
  } else {
    setTimeout(increaseProgressBar, Math.random() * 50 + 25);
  }
}

/// Watch for "Enter" key-press.

onBeforeUnmount(() => {
  window.removeEventListener('keydown', emitEnter);
});

watch(progress, () => {
  if (progress.value >= 1) {
    window.addEventListener('keydown', emitEnter);
  }
});

function emitEnter() {
  emit('enter');
}
</script>

<template>
  <div class="Bootloader">
    <div class="Sadboi">/ sadboi /</div>

    <div class="Loader">
      <div class="LoadingText">
        Your experience is being pulled from the void...
      </div>
      <div class="LoadingBar"><div :style="`width: ${100 * progress}%`" /></div>
      <div class="EnterText" v-show="progress >= 1">press any key to enter</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/layout';
@import '@/styles/fonts';
@import '@/styles/sizing_shelves';

.Bootloader {
  @include layout-center;
  @include layout-fill;
}

.Sadboi {
  @include _fonts-base;

  bottom: 148px;
  font-family: 'FoundersGrotesk';
  font-size: 56px;
  font-weight: 500;
  left: 0;
  letter-spacing: -0.53px;
  mix-blend-mode: overlay;
  opacity: 0.5;
  position: absolute;
  right: 0;
  text-align: center;
  user-select: none;
}

.Loader {
  margin: 40px;
  max-width: 400px;
  position: relative;
}

.LoadingText {
  @include _fonts-base;

  font-family: 'NineteenNinetyThree', 'Helvetica';
  font-size: 21px;
  letter-spacing: -0.18px;
  line-height: 31px;
  text-align: center;
  margin-bottom: 30px;
}

.LoadingBar {
  height: 5px;
  margin: 0 55px;
  position: relative;

  &::before {
    @include layout-fill;

    background: #ffffff;
    content: '';
    display: block;
    mix-blend-mode: overlay;
  }

  & > div {
    background: linear-gradient(90deg, #3700bc 0%, #a014bb 100%);
    height: 100%;
    max-width: 100%;
    opacity: 0.9;
  }
}

.EnterText {
  @include fonts-body;

  margin-top: 10px;
  position: absolute;
  text-align: center;
  width: 100%;
}
</style>
