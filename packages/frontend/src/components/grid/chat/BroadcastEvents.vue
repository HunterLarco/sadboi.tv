<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue';

import BroadcastEvent from '@/components/grid/chat/BroadcastEvent.vue';
import UnreadBanner from '@/components/grid/chat/UnreadBanner.vue';
import { useBroadcastStore } from '@/store/broadcast';
import { useGridStore } from '@/store/grid';

const broadcastStore = useBroadcastStore();
const gridStore = useGridStore();

// When true, indicates that as new content is rendered, we update the chat's
// scroll position to view the new content.
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
      // When we open the Chat window, if we're already at the bottom of the
      // scroll area, restore `isAutoScrolling` to true.
      nextTick(() => {
        onScroll();
      });
    }
  }
);

watch(ascendingEvents, (after, before) => {
  // If the messages are being appended as new messages. Whereas will be false
  // when prepending old messages (e.g. fetching more message history).
  const areNewMessages = before.length == 0 || before[0].id == after[0].id;

  if (areNewMessages) {
    // When new messages are added, either auto-scroll are increase the count of
    // unread events.
    if (isAutoScrolling.value) {
      nextTick(() => {
        scrollToBottom();
      });
    } else {
      unreadEvents.value += after.length - before.length;
    }
  } else {
    // When historical events are added, we always want to add the new content
    // to the DOM without moving the scroll position. This logic ensures that
    // the scroll position doesn't change by first snapshotting it before the
    // new content is rendered, and then reapplying it after the content is
    // rendered.
    if (!scrollFrame.value) return;
    const scrollHeight = scrollFrame.value.scrollHeight;
    const scrollTop = scrollFrame.value.scrollTop;
    nextTick(() => {
      if (!scrollFrame.value) return;
      scrollFrame.value.scrollTop =
        scrollTop + (scrollFrame.value.scrollHeight - scrollHeight);
    });
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

  if (scrollFrame.value.scrollTop < scrollFrame.value.offsetHeight) {
    // If we're less than one full vertical scroll away from the top, we should
    // try to fetch more history.
    broadcastStore.fetchMoreEvents();
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
  background: var(--grid-page-background);
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
