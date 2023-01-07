<script setup lang="ts">
import { UserHandleColor } from '@generated/graphql/operations';
import { ref, watch } from 'vue';

import UserHandleColorPicker from '@/components/UserHandleColorPicker.vue';
import UserHandleNameInput from '@/components/UserHandleNameInput.vue';
import ShakaIcon from '@/components/grid/chat/ShakaIcon.vue';
import { useGridStore } from '@/store/grid';
import { useUserStore } from '@/store/user';

const gridStore = useGridStore();
const userStore = useUserStore();

const handleNameInput = ref<InstanceType<typeof UserHandleNameInput>>();
const handleName = ref('');
const handleColor = ref(UserHandleColor.Red);

const shakaIcon = ref<InstanceType<typeof ShakaIcon>>();

/// Apply the current user's data to the handle settings.

watch(
  () => userStore.currentUser?.handle.color,
  () => {
    handleColor.value =
      userStore.currentUser?.handle.color ?? UserHandleColor.Red;
  },
  { immediate: true }
);

watch(
  () => userStore.currentUser?.handle.name,
  () => {
    handleName.value = userStore.currentUser?.handle.name ?? '';
  },
  { immediate: true }
);

/// Actions

async function enterChat() {
  if (userStore.currentUser) {
    await userStore.setHandle({
      name: handleName.value,
      color: handleColor.value,
    });
  } else {
    await userStore.createUser({
      name: handleName.value,
      color: handleColor.value,
    });
  }
  gridStore.enterChat();
}
</script>

<template>
  <div class="EnterChatInputBar">
    <UserHandleColorPicker v-model="handleColor" />

    <div class="HandleEditor" @click="handleNameInput?.focus()">
      <div class="InputLabel">Preferred Handle:</div>
      <div class="Input">
        <UserHandleNameInput
          v-model="handleName"
          ref="handleNameInput"
          :color="handleColor"
        />
      </div>
    </div>

    <div class="ConfirmationBar">
      <div class="Icon" @click="gridStore.page = null">
        <img src="@/assets/images/grid/dock/ChatIcon.svg" />
      </div>
      <div class="Title" @mouseenter="shakaIcon?.wiggle()" @click="enterChat">
        <span>Ready to enter the chat?</span>
        <span><ShakaIcon fill="#BAFFB7" ref="shakaIcon" /></span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/layout';
@import '@/styles/fonts';

.EnterChatInputBar {
}

.HandleEditor {
  @include layout-horizontal;

  background: var(--grid-titlebar-background);
  cursor: text;
  height: 48px;
  padding: 0 20px;
}

.InputLabel {
  @include fonts-body;
  @include layout-vertical-center;

  flex-shrink: 0;
  font-weight: 600;
  margin-right: 10px;
}

.Input {
  @include layout-vertical-center;

  flex-grow: 1;
  overflow: hidden;

  & > * {
    width: 100%;
  }
}

.ConfirmationBar {
  @include layout-horizontal;

  height: 48px;
}

.Title {
  @include fonts-notes;
  @include layout-horizontal;

  background: var(--grid-titlebar-background);
  cursor: pointer;
  flex-grow: 1;
  font-weight: 600;
  overflow: hidden;
  padding: 0 24px;
  text-overflow: ellipsis;

  & > span:nth-child(1) {
    @include layout-vertical-center;

    flex-grow: 1;
  }

  & > span:nth-child(2) {
    @include layout-vertical-center;

    flex-shrink: 0;
  }
}

.Icon {
  cursor: pointer;
  flex-shrink: 0;
  width: 50px;
  height: 48px;
  padding: 2px 2px 0 2px;
  position: relative;

  &::before {
    @include layout-fill;

    background: var(--grid-icon-background);
    content: '';
    display: block;
    mix-blend-mode: overlay;
    z-index: -1;
  }

  img {
    width: 100%;
    height: 100%;
  }
}
</style>
