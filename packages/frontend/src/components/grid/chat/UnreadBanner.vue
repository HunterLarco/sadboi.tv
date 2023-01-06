<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  count: number;
}>();

const bannerStyles = computed(() =>
  props.count == 0
    ? { transform: 'translate(0, 100%)' }
    : { transform: 'translate(0, 0%)' }
);
</script>

<template>
  <div class="UnreadBanner">
    <div class="Banner" :style="bannerStyles">
      {{ props.count > 99 ? '99+' : props.count }} Unread Messages // Scroll
      Down
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/fonts';

.UnreadBanner {
  height: 0;
  overflow: visible;
  position: relative;
}

.Banner {
  @include fonts-body;

  background: #555555;
  bottom: 0;
  left: 0;
  overflow: hidden;
  padding: 10px 9px;
  position: absolute;
  right: 0;
  text-align: center;
  text-overflow: ellipsis;
  transition: transform 250ms;
  white-space: nowrap;
}
</style>
