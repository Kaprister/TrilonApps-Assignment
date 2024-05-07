import { apiSlice } from './apiSlice';
const USERS_URL = '/api/v1/users';
import { loginRoute, signupRoute, logoutRoute, getPlayerDetailsRoute, getAllPlayersRoute } from '../utils/APIRoutes';


export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${loginRoute}`,
        method: 'POST',
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: (data) => ({
        url: `${logoutRoute}`,
        method: 'POST',
        body: data,
      }),
    }),
    signup: builder.mutation({
      query: (data) => ({
        url: `${signupRoute}`,
        method: 'POST',
        body: data,
      }),
    }),
    getPlayerDetails: builder.mutation({
      query: (data) => ({
        url: `${getPlayerDetailsRoute}`,
        method: 'POST',
        body: data,
      }),
    }),
    getAllPlayers: builder.mutation({
        query: () => ({
          url: `${getAllPlayersRoute}`,
          method: 'GET',
        }),
      }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useSignupMutation,
  useGetPlayerDetailsMutation,
  useGetAllPlayersMutation
} = userApiSlice;