<script setup lang="ts">
// TODO: https://github.com/trivago/prettier-plugin-sort-imports/issues/191
</script>

<template>
  <div class="Host">
    <div class="Icon">
      <img src="@/assets/images/grid/dock/ChatIcon.svg" />
    </div>
    <div class="Icon">
      <img src="@/assets/images/grid/dock/SettingsIcon.svg" />
    </div>
    <div class="Spacer" />
    <div class="Icon">
      <img src="@/assets/images/grid/dock/InfoIcon.svg" />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/layout';

.Host {
  @include layout-horizontal;

  height: 50px;
  padding: 1px;
  position: relative;

  &::before {
    @include layout-fill;

    background-image: url('@/assets/images/GridOutline.svg');
    background-position: 25px 25px;
    background-repeat: repeat;
    content: '';
    display: block;
    mix-blend-mode: overlay;
    z-index: -1;
  }
}

.Spacer {
  flex-grow: 1;
}

.Icon {
  cursor: pointer;
  flex-shrink: 0;
  height: 48px;
  padding: 1px;
  position: relative;
  width: 48px;

  img {
    height: 100%;
    width: 100%;
  }

  &:hover::before {
    background: #fff;
    bottom: 1px;
    content: '';
    display: block;
    left: 1px;
    mix-blend-mode: overlay;
    position: absolute;
    right: 1px;
    top: 1px;
    z-index: -1;
  }
}
</style>
