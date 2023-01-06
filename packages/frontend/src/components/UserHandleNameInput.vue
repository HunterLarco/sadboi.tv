<script setup lang="ts">
import type { UserHandleColor } from '@generated/graphql/operations';
import { computed, nextTick, ref, watch } from 'vue';

import { toUserHandleHexPattern } from '@/util/user_handle';

const props = withDefaults(
  defineProps<{
    modelValue: string;
    placeholder?: string;
    color: UserHandleColor;
  }>(),
  {
    placeholder: 'snowflakesmasher86',
  }
);

const emit = defineEmits(['update:modelValue']);

defineExpose({ focus });

/// Auto-focus

const input = ref<HTMLInputElement>();

function focus() {
  if (!input.value) return;
  input.value.focus();
}

/// Logic to automatically size the input region to its contents.

const sizer = ref<HTMLSpanElement>();

const inputWidth = ref(0);
watch(
  () => props.modelValue,
  () => {
    nextTick(() => {
      if (!sizer.value) return;
      inputWidth.value = sizer.value.offsetWidth + 1;
    });
  },
  { immediate: true }
);

const nameStyles = computed(() => ({
  width: `${inputWidth.value}px`,
  ...handleColorStyles.value.center,
}));

/// Handle Colors

const handleColorStyles = computed(() => {
  if (!props.modelValue) {
    return {
      left: { color: '#757575' },
      center: { color: '#757575' },
      right: { color: '#757575' },
    };
  }

  const hexPattern = toUserHandleHexPattern(props.color);
  return {
    left: { color: hexPattern.left },
    center: { color: hexPattern.center },
    right: { color: hexPattern.right },
  };
});

/// Input Handling

function onInput(event: Event) {
  const value = (<HTMLInputElement>event.target).value;
  emit('update:modelValue', value);
}

function onPaste(event: ClipboardEvent) {
  const text: string = event.clipboardData?.getData('text') ?? '';
  return text.replace(/[^a-zA-Z0-9_]/g, '');
}

function onKeyPress(event: KeyboardEvent) {
  if (event.key == ' ') {
    // As a convenience, automatically convert spaces into underscores.
    event.preventDefault();
    const value = (<HTMLInputElement>event.target).value;
    emit('update:modelValue', value + '_');
  } else if (event.key.match(/[^a-zA-Z0-9_]/g)) {
    event.preventDefault();
  }
}
</script>

<template>
  <div class="UserHandleNameInput" @click="focus">
    <span class="Bracket" :style="handleColorStyles.left">[</span>
    <input
      type="text"
      class="Name"
      ref="input"
      :value="props.modelValue"
      @input="onInput"
      @keypress="onKeyPress"
      @paste="onPaste"
      :style="nameStyles"
      :placeholder="props.placeholder"
    />
    <span class="Bracket" :style="handleColorStyles.right">]</span>

    <span class="TextSizer" ref="sizer">{{
      props.modelValue || props.placeholder
    }}</span>
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/fonts';
@import '@/styles/layout';

.UserHandleNameInput {
  @include layout-horizontal;

  cursor: text;
  white-space: nowrap;
}

.Bracket {
  @include fonts-notes;

  flex-shrink: 0;
  font-weight: 600;
}

.Name {
  @include fonts-notes;

  background: none;
  border: none;
  color: inherit;
  font-weight: 600;
  outline: none;
  overflow: hidden;
  text-overflow: ellipsis;
}

.TextSizer {
  @include fonts-notes;

  font-weight: 600;
  height: 0;
  position: fixed;
  visibility: hidden;
  white-space: pre;
}
</style>
