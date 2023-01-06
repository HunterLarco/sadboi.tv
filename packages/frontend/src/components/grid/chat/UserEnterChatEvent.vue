<script setup lang="ts">
import type { GetBroadcastEventHistoryQuery } from '@generated/graphql/operations';
import { computed, onMounted, ref } from 'vue';

import UserHandle from '@/components/UserHandle.vue';
import ShakaIcon from '@/components/grid/chat/ShakaIcon.vue';
import { toUserHandleHexPattern } from '@/util/user_handle';

type BroadcastEvent =
  GetBroadcastEventHistoryQuery['broadcastEventHistory']['events'][number];

const props = defineProps<{
  event: BroadcastEvent;
}>();

const enterChat = computed(() => props.event.details.userEnterChat!);
const shakaIconColor = computed(
  () => toUserHandleHexPattern(enterChat.value.preservedHandle.color).center
);

/// Lifecycle Hooks

const shakaIcon = ref<InstanceType<typeof ShakaIcon>>();
onMounted(() => {
  setTimeout(() => {
    shakaIcon.value?.wiggle();
  }, 250);
});
</script>

<template>
  <div class="UserEnterChatEvent">
    <div class="Left">
      <ShakaIcon :fill="shakaIconColor" ref="shakaIcon" />
    </div>

    <div class="Right">
      <div>
        <UserHandle
          :user-id="enterChat.user.id"
          :handle="enterChat.preservedHandle"
        />
        has entered the chat.
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/fonts';
@import '@/styles/layout';

.UserEnterChatEvent {
  @include layout-horizontal;
}

.Left {
  flex-shrink: 0;
  margin-right: 20px;
}

.Right {
  @include fonts-notes;
  @include layout-vertical-center;

  flex-grow: 1;
}
</style>
