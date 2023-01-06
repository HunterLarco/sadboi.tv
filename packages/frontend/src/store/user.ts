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
import { useApolloClient } from '@vue/apollo-composable';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useUserStore = defineStore('user', () => {
  const apolloClient = useApolloClient();

  const getViewerQuery = useGetViewerQuery();
  const completedInitialLoad = ref(false);
  const currentUser = computed(() => getViewerQuery.result.value?.viewer);

  getViewerQuery.onResult(() => {
    completedInitialLoad.value = true;
  });

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
          query: getViewerQuery.document.value,
          data: { viewer: user },
        });
      },
    });

    await mutate();
  };

  const setHandle = async (args: {
    name?: string;
    color?: UserHandleColor;
  }) => {
    const { name, color } = args;

    const { mutate } = useSetUserHandleMutation({
      variables: {
        name,
        color,
      },
    });

    await mutate();
  };

  const logout = async () => {
    window.localStorage.removeItem('authorization');
    apolloClient.client.cache.writeQuery<
      GetViewerQuery,
      GetViewerQueryVariables
    >({
      query: GetViewerDocument,
      data: { viewer: null },
    });
    // Because authorization impacts all responses via personalization, we force
    // every active query to refetch.
    await apolloClient.client.refetchQueries({
      include: 'all',
    });
  };

  return { completedInitialLoad, currentUser, createUser, setHandle, logout };
});
