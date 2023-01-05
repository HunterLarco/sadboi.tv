import { defineStore } from 'pinia';
import { ref } from 'vue';

type GridPage = null | 'Chat' | 'Settings' | 'Info';

export const useGridStore = defineStore('grid', () => {
  const page = ref<GridPage>(null);

  return { page };
});
