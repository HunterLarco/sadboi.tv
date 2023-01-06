import type {
  GetViewerQuery,
  GetViewerQueryVariables,
  UserHandleColor,
} from '@generated/graphql/operations';
import {
  GetViewerDocument,
  useCreateUserMutation,
  useGetViewerQuery,
  useSetUserHandleMutation,
} from '@generated/graphql/operations';
import { defineStore } from 'pinia';
import { computed } from 'vue';

export const useUserStore = defineStore('user', () => {
  const getViewerQuery = useGetViewerQuery();
  const currentUser = computed(() => getViewerQuery.result.value?.viewer);

  const createUser = async (args: { name: string; color: UserHandleColor }) => {
    const { name, color } = args;

    const { mutate } = useCreateUserMutation({
      variables: {
        handleName: name,
        handleColor: color,
      },
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

    await mutate();
  };

  const setHandle = async (args: { name: string; color: UserHandleColor }) => {
    const { name, color } = args;

    const { mutate } = useSetUserHandleMutation({
      variables: {
        name,
        color,
      },
    });

    await mutate();
  };

  return { currentUser, createUser, setHandle };
});
