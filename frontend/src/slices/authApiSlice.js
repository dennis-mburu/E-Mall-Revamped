import { USERS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/login`, 
        method: 'POST',
        body: data
      }),
    }),
  }),
});

export const { useLoginMutation } = authApiSlice;