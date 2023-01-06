<script setup lang="ts">
import { ref } from 'vue';

import UserHandleNameInput from '@/components/UserHandleNameInput.vue';
import { useGridStore } from '@/store/grid';

const gridStore = useGridStore();

const handleName = ref('');
</script>

<template>
  <div class="InputBar">
    <div class="HandleEditor">
      <div class="InputLabel">Preferred Handle:</div>
      <div class="Input">
        <UserHandleNameInput v-model="handleName" />
      </div>
    </div>

    <div class="ConfirmationBar">
      <div class="Icon" @click="gridStore.page = null">
        <img src="@/assets/images/grid/dock/ChatIcon.svg" />
      </div>
      <div class="Title">Ready to enter the chat?</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/layout';
@import '@/styles/fonts';

.InputBar {
}

.HandleEditor {
  @include layout-horizontal;

  background: #1e1d1e;
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
  @include fonts-body;
  @include layout-vertical-center;

  background: #1e1d1e;
  color: #d3b7ff;
  flex-grow: 1;
  overflow: hidden;
  padding: 0 24px;
  text-overflow: ellipsis;
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

    background: #fff;
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
