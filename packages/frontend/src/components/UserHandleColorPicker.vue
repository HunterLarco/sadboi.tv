<script setup lang="ts">
import { UserHandleColor } from '@generated/graphql/operations';

import { toUserHandleHexPattern } from '@/util/user_handle';

const props = withDefaults(
  defineProps<{
    modelValue: string;
    availableColors?: Array<UserHandleColor>;
  }>(),
  {
    availableColors: () => [
      UserHandleColor.Green,
      UserHandleColor.Turquoise,
      UserHandleColor.Lavender,
      UserHandleColor.Violet,
      UserHandleColor.Pink,
      UserHandleColor.Red,
      UserHandleColor.Orange,
      UserHandleColor.Yellow,
    ],
  }
);

const emit = defineEmits(['update:modelValue']);

function createSwatchStyle(color: UserHandleColor) {
  return {
    background: toUserHandleHexPattern(color).center,
  };
}
</script>

<template>
  <div class="UserHandleColorPicker">
    <div
      class="Swatch"
      v-for="color of props.availableColors"
      :key="color"
      :style="createSwatchStyle(color)"
      @click="emit('update:modelValue', color)"
    />
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/fonts';
@import '@/styles/layout';

.UserHandleColorPicker {
  @include layout-horizontal;

  cursor: pointer;
}

.Swatch {
  flex-grow: 1;
  height: 8px;
}
</style>
