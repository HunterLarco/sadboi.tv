<script setup lang="ts">
import type { UserHandleColor } from '@generated/graphql/operations';
import { computed } from 'vue';

import { useUserStore } from '@/store/user';
import { toUserHandleHexPattern } from '@/util/user_handle';

const props = defineProps<{
  userId?: string;
  handle: {
    name: string;
    color: UserHandleColor;
  };
}>();

const userStore = useUserStore();

const hexColor = computed(() => toUserHandleHexPattern(props.handle.color));

const isYou = computed(
  () => props.userId && userStore.currentUser?.id == props.userId
);
</script>

<template>
  <div class="UserHandle">
    <div
      class="Highlight"
      v-if="isYou"
      :style="{ background: hexColor.center }"
    />

    <div class="Text">
      <span class="Bracket" :style="{ color: hexColor.left }">[</span>
      <span class="Name" :style="{ color: hexColor.center }">{{
        props.handle.name
      }}</span>
      <span class="Bracket" :style="{ color: hexColor.right }">]</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/fonts';
@import '@/styles/layout';

.UserHandle {
  display: inline-block;
  max-width: min(100%, 200px);
  position: relative;
}

.Highlight {
  @include layout-fill;

  opacity: 0.2;
}

.Text {
  @include layout-horizontal;

  white-space: nowrap;

  & span {
    @include fonts-notes;

    font-weight: 600;
  }
}

.Bracket {
  flex-shrink: 0;
}

.Name {
  flex-grow: 1;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
