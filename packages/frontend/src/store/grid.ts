import { defineStore } from 'pinia';
import { ref } from 'vue';

export type GridPage = null | 'Chat' | 'Settings' | 'Info';

export const useGridStore = defineStore('grid', () => {
  const page = ref<GridPage>('Chat');

  return { page };
});
