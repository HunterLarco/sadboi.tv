import type {
  GetViewerQuery,
  GetViewerQueryVariables,
} from '@generated/graphql/operations';
import {
  GetViewerDocument,
  useCreateUserMutation,
  useGetViewerQuery,
} from '@generated/graphql/operations';
import { defineStore } from 'pinia';
import { computed } from 'vue';

export const useUserStore = defineStore('user', () => {
  const getViewerQuery = useGetViewerQuery();
  const currentUser = computed(() => getViewerQuery.result.value?.viewer);

  const createUser = () => {
    const { mutate } = useCreateUserMutation({
      update(cache, result) {
        const response = result.data?.createUser;
        if (!response) {
          return;
        }

        const { authToken, user } = response;
        window.localStorage.setItem('authorization', authToken);

        cache.writeQuery<GetViewerQuery, GetViewerQueryVariables>({
          query: GetViewerDocument,
          data: { viewer: user },
        });
      },
    });

    mutate();
  };

  return { currentUser, createUser };
});
