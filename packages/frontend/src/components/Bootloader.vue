<script setup lang="ts">
import FontFaceObserver from 'fontfaceobserver';
import {
  computed,
  onBeforeUnmount,
  onMounted,
  ref,
  shallowRef,
  watch,
} from 'vue';

import type SadboiBroadcastType from '@/components/SadboiBroadcast.vue';
import type { useBroadcastStore as useBroadcastStoreType } from '@/store/broadcast';
import type { useGridStore as useGridStoreType } from '@/store/grid';
import type { useUserStore as useUserStoreType } from '@/store/user';

const emit = defineEmits(['enter']);

const userStore = shallowRef<ReturnType<typeof useUserStoreType>>();
const gridStore = shallowRef<ReturnType<typeof useGridStoreType>>();
const broadcastStore = shallowRef<ReturnType<typeof useBroadcastStoreType>>();
const appComponent = shallowRef<typeof SadboiBroadcastType>();

type FontFace = {
  family: string;
  style: 'normal' | 'italic';
  weight: number;
};

const kFonts: Array<FontFace> = [
  {
    family: 'FoundersGrotesk',
    style: 'normal',
    weight: 300,
  },
  {
    family: 'FoundersGrotesk',
    style: 'normal',
    weight: 400,
  },
  {
    family: 'FoundersGrotesk',
    style: 'normal',
    weight: 500,
  },
  {
    family: 'FoundersGrotesk',
    style: 'normal',
    weight: 600,
  },
  {
    family: 'FoundersGrotesk',
    style: 'normal',
    weight: 700,
  },
  {
    family: 'FoundersGrotesk',
    style: 'italic',
    weight: 300,
  },
  {
    family: 'FoundersGrotesk',
    style: 'italic',
    weight: 400,
  },
  {
    family: 'FoundersGrotesk',
    style: 'italic',
    weight: 500,
  },
  {
    family: 'FoundersGrotesk',
    style: 'italic',
    weight: 600,
  },
  {
    family: 'FoundersGrotesk',
    style: 'italic',
    weight: 700,
  },
  {
    family: 'FoundersGroteskMono',
    style: 'normal',
    weight: 300,
  },
  {
    family: 'FoundersGroteskMono',
    style: 'normal',
    weight: 400,
  },
  {
    family: 'FoundersGroteskMono',
    style: 'normal',
    weight: 500,
  },
  {
    family: 'FoundersGroteskMono',
    style: 'normal',
    weight: 600,
  },
  {
    family: 'FoundersGroteskMono',
    style: 'normal',
    weight: 700,
  },
  {
    family: 'NineteenNinetyThree',
    style: 'normal',
    weight: 400,
  },
];

const fontsLoaded = ref<Array<boolean>>(kFonts.map((_) => false));

onMounted(async () => {
  // The bootloader needs to do a few things:
  //
  // 1. Load each Pinia store and retain a pointer to them. We do this because
  //    our Pinia stores need to both initialize their data and because they
  //    contain Apollo Queries. Apollo Queries stop updating when they're not
  //    active in a mounted component. However, for our stores we always want
  //    them to be active.
  // 2. Load the main sadboi component. This will be rendered when we're ready
  //    to transition from the bootloader.
  // 3. Load the fonts used by the rest of the application.

  /// 1. Load the stores.

  const { useUserStore } = await import('@/store/user');
  userStore.value = useUserStore();

  const { useGridStore } = await import('@/store/grid');
  gridStore.value = useGridStore();

  const { useBroadcastStore } = await import('@/store/broadcast');
  broadcastStore.value = useBroadcastStore();

  /// 2. Load the main sadboi component.

  const appModule = await import('@/components/SadboiBroadcast.vue');
  appComponent.value = appModule.default;

  /// 3. Load fonts.

  for (let i = 0; i < kFonts.length; ++i) {
    const font = kFonts[i];
    console.log(`Loading font:`, font);
    await loadFont(font);
    fontsLoaded.value[i] = true;
  }
});

async function loadFont(font: FontFace) {
  const observer = new FontFaceObserver(font.family, {
    weight: font.weight,
    style: font.style,
  });
  await observer.load();
}

/// Calculate progress.

const progress = computed(() => {
  const steps: Array<boolean> = [
    !!userStore.value?.completedInitialLoad,
    !!gridStore.value,
    !!broadcastStore.value,
    !!appComponent.value,
    ...fontsLoaded.value,
  ];

  return steps.filter((step) => step).length / steps.length;
});

/// Watch for "Enter" key-press.

onBeforeUnmount(() => {
  window.removeEventListener('keydown', emitEnter);
  window.removeEventListener('mousedown', emitEnter);
});

watch(progress, () => {
  if (progress.value >= 1) {
    window.addEventListener('keydown', emitEnter);
    window.addEventListener('mousedown', emitEnter);
  }
});

function emitEnter() {
  emit('enter', appComponent.value);
}
</script>

<template>
  <div class="Bootloader">
    <div class="Sadboi">/ sadboi /</div>
    <img src="@/assets/images/BootloaderStars.svg" class="Stars" />

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

.Stars {
  left: 50%;
  mix-blend-mode: overlay;
  pointer-events: none;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 70%;
}
</style>
