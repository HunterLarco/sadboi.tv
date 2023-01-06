import { useEnterChatMutation } from '@generated/graphql/operations';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export type GridPage = null | 'Chat' | 'Settings' | 'Info';

export const useGridStore = defineStore('grid', () => {
  const page = ref<GridPage>('Chat');
  const hasEnteredChat = ref(false);

  const enterChat = async () => {
    const { mutate, onDone } = useEnterChatMutation({});

    onDone(() => {
      hasEnteredChat.value = true;
    });

    await mutate();
  };

  return { page, hasEnteredChat, enterChat };
});
