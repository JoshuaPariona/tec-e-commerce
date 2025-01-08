import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const storeApiSlice = createApi({
  reducerPath: "storeApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api" }),
  endpoints: (builder) => ({
    getStores: builder.query({
      query: () => `/stores`,
      transformResponse: (res: any) => {
        return res.data.filter((item: any)=>  item !== null);
      },
    }),
    getStoreById: builder.query({
      query: (storeId) => `/stores/${storeId}`,
      transformResponse: (res: any) => {
        return res.data;
      },
    }),
  }),
});

export const { useGetStoresQuery, useGetStoreByIdQuery, useLazyGetStoreByIdQuery} = storeApiSlice;