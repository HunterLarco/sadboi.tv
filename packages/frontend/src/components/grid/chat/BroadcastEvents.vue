<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue';

import BroadcastEvent from '@/components/grid/chat/BroadcastEvent.vue';
import UnreadBanner from '@/components/grid/chat/UnreadBanner.vue';
import { useBroadcastStore } from '@/store/broadcast';
import { useGridStore } from '@/store/grid';

const broadcastStore = useBroadcastStore();
const gridStore = useGridStore();

// Defines if the content is currently being auto-scrolled, that is that we're
// automatically scrolling the `scrollFrame` with new content.
const isAutoScrolling = ref(true);

const scrollFrame = ref<HTMLDivElement>();
const ascendingEvents = computed(() => [...broadcastStore.events].reverse());
const unreadEvents = ref(0);

/// Auto-scroll Watcher

watch(
  () => gridStore.page,
  () => {
    if (gridStore.page != 'Chat') {
      // Automatically stop scrolling when the chat window isn't visible. This
      // way we preserve the user's scroll location.
      isAutoScrolling.value = false;
    } else {
      // When we open the Chat window, quickly double check if we should be
      // auto-scrolling.
      nextTick(() => {
        onScroll();
      });
    }
  }
);

watch(ascendingEvents, (after, before) => {
  if (isAutoScrolling.value) {
    nextTick(() => {
      scrollToBottom();
    });
  } else {
    unreadEvents.value += after.length - before.length;
  }
});

/// Event Listeners

function onScroll() {
  if (!scrollFrame.value) return;

  const atBottom =
    scrollFrame.value.scrollTop + scrollFrame.value.offsetHeight >=
    scrollFrame.value.scrollHeight;
  isAutoScrolling.value = atBottom;

  if (atBottom) {
    unreadEvents.value = 0;
  }
}

/// Actions

function scrollToBottom() {
  if (!scrollFrame.value) return;
  scrollFrame.value.scrollTop = scrollFrame.value.scrollHeight;
}
</script>

<template>
  <div class="BroadcastEvents">
    <div class="Events" ref="scrollFrame" @scroll="onScroll">
      <BroadcastEvent
        :event="event"
        v-for="event of ascendingEvents"
        :key="event.id"
      />
    </div>
    <UnreadBanner
      class="UnreadBanner"
      :count="unreadEvents"
      @click="scrollToBottom"
    />
  </div>
</template>

<style scoped lang="scss">
.BroadcastEvents {
  background: #000;
}

.Events {
  padding: 12px 0;
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
}

.UnreadBanner {
  cursor: pointer;
}
</style>
