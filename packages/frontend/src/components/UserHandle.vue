<script setup lang="ts">
import { UserHandleColor } from '@generated/graphql/operations';
import { computed } from 'vue';

const props = defineProps<{
  handle: {
    name: string;
    color: UserHandleColor;
  };
}>();

const hexColor = computed(
  (): { left: string; center: string; right: string } => {
    switch (props.handle.color) {
      case UserHandleColor.Unknown:
        return { left: '#1E1D1E', center: '#1E1D1E', right: '#1E1D1E' };
      case UserHandleColor.Green:
        return { left: '#BAFFB7', center: '#BAFFB7', right: '#BAFFB7' };
      case UserHandleColor.Lavender:
        return { left: '#B7DFFF', center: '#B7DFFF', right: '#B7DFFF' };
      case UserHandleColor.Orange:
        return { left: '#FFD1B7', center: '#FFD1B7', right: '#FFD1B7' };
      case UserHandleColor.Pink:
        return { left: '#E1B7FF', center: '#E1B7FF', right: '#E1B7FF' };
      case UserHandleColor.Red:
        return { left: '#FFB7D0', center: '#FFB7D0', right: '#FFB7D0' };
      case UserHandleColor.Turquoise:
        return { left: '#B7FFE8', center: '#B7FFE8', right: '#B7FFE8' };
      case UserHandleColor.Violet:
        return { left: '#B7BBFF', center: '#B7BBFF', right: '#B7BBFF' };
      case UserHandleColor.Yellow:
        return { left: '#FFFDB7', center: '#FFFDB7', right: '#FFFDB7' };
      case UserHandleColor.SadBot:
        return { left: '#3700BC', center: '#A014BB', right: '#A014BB' };
    }
  }
);
</script>

<template>
  <div class="UserHandle">
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
