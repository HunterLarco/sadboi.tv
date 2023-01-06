<script setup lang="ts">
import { UserHandleColor } from '@generated/graphql/operations';

import { toUserHandleHexPattern } from '@/util/user_handle';

const props = withDefaults(
  defineProps<{
    modelValue?: UserHandleColor;
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

const emit = defineEmits(['update:modelValue', 'select']);

function createSwatchStyle(color: UserHandleColor) {
  return {
    background: toUserHandleHexPattern(color).center,
  };
}

function select(color: UserHandleColor) {
  emit('update:modelValue', color);

  // If clients want to react to user actions in this component, they need a
  // signal in addition to v-model. Unlike watching the v-model, the @select
  // even ensures that only user actions triggered the change.
  emit('select', color);
}
</script>

<template>
  <div class="UserHandleColorPicker">
    <div
      class="Swatch"
      v-for="color of props.availableColors"
      :key="color"
      :style="createSwatchStyle(color)"
      @click="select(color)"
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
