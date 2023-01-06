<script setup lang="ts">
import ShowOverIcon from '@/assets/images/billboard/show_over.svg';
import BillboardStatus from '@/components/billboard/BillboardStatus.vue';
import BillboardTitle from '@/components/billboard/BillboardTitle.vue';
</script>

<template>
  <div class="PreShowBillboard">
    <div class="Content">
      <BillboardStatus :icon="ShowOverIcon" status="OFF AIR" />
      <BillboardTitle text="SADBOI.TV // ALPHA" />
      <p>
        Welcome! Hit the Shaka button to join the chat. You can use the settings
        panel to update your username.
      </p>
      <p>Our shows don't run anymore, but we're still here to chat and vibe.</p>
    </div>

    <div class="Footer">Version 0.1.0 // Thanks for tuning in =]</div>
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/fonts';
@import '@/styles/layout';
@import '@/styles/sizing_shelves';

.PreShowBillboard {
  @include layout-vertical;
}

.Content {
  flex-grow: 1;
  overflow-x: hidden;
  overflow-y: scroll;

  & > p {
    @include fonts-body;

    margin: 25px 0;
    max-width: 700px;

    @include sizing-shelf-highdpi {
      margin: 20px 0;
    }

    & > a {
      color: #d3b7ff;
      cursor: pointer;
      text-decoration: underline;
    }

    & > b {
      font-weight: 600;
    }
  }
}

.Footer {
  @include fonts-body;

  flex-shrink: 0;
}
</style>
