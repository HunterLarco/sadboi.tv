<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';

const props = defineProps<{
  destination: 'body';
}>();

const destination = computed(() => {
  switch (props.destination) {
    case 'body':
      return document.body;
  }
});

const relocationFrame = ref<HTMLDivElement>();

onMounted(() => {
  destination.value.appendChild(relocationFrame.value!);
});

onBeforeUnmount(() => {
  destination.value.removeChild(relocationFrame.value!);
});
</script>

<template>
  <div>
    <div ref="relocationFrame">
      <slot></slot>
    </div>
  </div>
</template>
