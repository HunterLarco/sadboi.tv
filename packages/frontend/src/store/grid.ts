import { ref } from 'vue';

type GridPage = null | 'Chat' | 'Settings' | 'Info';

export const page = ref<GridPage>(null);
