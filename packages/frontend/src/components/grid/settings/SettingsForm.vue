<script setup lang="ts">
import type { UserHandleColor } from '@generated/graphql/operations';
import { onBeforeUnmount, ref, watch } from 'vue';

import UserHandleColorPicker from '@/components/UserHandleColorPicker.vue';
import UserHandleNameInput from '@/components/UserHandleNameInput.vue';
import { useUserStore } from '@/store/user';

const userStore = useUserStore();

const handleColor = ref<UserHandleColor>();
const handleName = ref<string>();

/// Automatically populate the input fields with the signed in user's data.

watch(
  () => userStore.currentUser?.handle.color,
  () => {
    handleColor.value = userStore.currentUser?.handle.color;
  },
  { immediate: true }
);

watch(
  () => userStore.currentUser?.handle.name,
  () => {
    handleName.value = userStore.currentUser?.handle.name;
  },
  { immediate: true }
);

/// Save the changes when unmounted.

onBeforeUnmount(() => {
  userStore.setHandle({ name: handleName.value, color: handleColor.value });
});
</script>

<template>
  <div class="SettingsForm" v-if="userStore.currentUser">
    <div class="InputLabel">Username</div>
    <UserHandleNameInput
      class="HandleNameInput"
      v-model="handleName"
      :color="handleColor"
    />
    <UserHandleColorPicker
      v-model="handleColor"
      :available-colors="userStore.currentUser.handleSettings.availableColors"
    />
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/fonts';

.SettingsForm {
  padding: 22px;
}

.InputLabel {
  @include fonts-body;

  font-weight: 600;
}

.HandleNameInput {
  border: 2px solid var(--grid-input-border);
  padding: 15px 23px;
}
</style>
