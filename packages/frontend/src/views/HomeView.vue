<script setup lang="ts">
import { shallowRef } from 'vue';

import Bootloader from '@/components/Bootloader.vue';

const appComponent = shallowRef();
</script>

<template>
  <div class="HomePage">
    <Bootloader @enter="appComponent = $event" v-show="!appComponent" />
    <component :is="appComponent" />
  </div>
</template>
