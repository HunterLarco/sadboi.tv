<script setup lang="ts">
//
</script>

<template>
  <div class="InfoPage">
    <div class="Description">
      <p>chat</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/layout';
@import '@/styles/fonts';

.InfoPage {
  @include layout-vertical;

  height: 100%;
}

.Description {
  background: #000;
  flex-grow: 1;
  overflow-x: hidden;
  overflow-y: scroll;
  padding: 20px;

  & > p {
    @include fonts-collapsed-body;

    margin: 10px;

    & > a {
      color: #d3b7ff;
      cursor: pointer;
      text-decoration: underline;
    }
  }

  & > ul {
    @include fonts-collapsed-body;

    margin: 10px 10px 10px 30px;
  }
}

.TitleBar {
  flex-shrink: 0;
}
</style>
