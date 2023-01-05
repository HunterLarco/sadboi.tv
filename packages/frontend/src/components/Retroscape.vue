<script setup lang="ts">
// TODO: https://github.com/trivago/prettier-plugin-sort-imports/issues/191
</script>

<template>
  <div class="Host">
    <img src="~@/assets/images/retroscape.svg" />
  </div>
</template>

<style scoped lang="scss">
.Host {
  bottom: 0;
  left: 0;
  mix-blend-mode: overlay;
  opacity: 0.47;
  position: fixed;
  user-select: none;
  width: 100%;

  img {
    margin-bottom: -130px;
    width: 100%;
  }
}
</style>
