<script setup lang="ts">
import EnterChatInputBar from '@/components/grid/chat/EnterChatInputBar.vue';
import SendMessageInputBar from '@/components/grid/chat/SendMessageInputBar.vue';
import { useGridStore } from '@/store/grid';

const gridStore = useGridStore();
</script>

<template>
  <div>
    <EnterChatInputBar v-if="!gridStore.hasEnteredChat" />
    <SendMessageInputBar v-else />
  </div>
</template>
