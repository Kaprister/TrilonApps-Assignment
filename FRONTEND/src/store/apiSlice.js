import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';
import { baseUrl } from '../utils/APIRoutes';

const baseQuery = fetchBaseQuery({ baseUrl: `${baseUrl}` });

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['User'],
  endpoints: (builder) => ({}),
});