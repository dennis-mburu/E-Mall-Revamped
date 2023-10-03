import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants";

const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL });

export const apiSlice = createApi({
  baseQuery,
  // Define the types pf data that we'll be fetching from our API
  tagTypes: ["Product", "Order", "User"],
  endpoints: (builder) => ({}),
});
