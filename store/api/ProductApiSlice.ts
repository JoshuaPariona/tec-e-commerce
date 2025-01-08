import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApiSlice = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api" }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => `/products`,
      transformResponse: (res: any) => {
        return res.data.filter((item: any)=>  item !== null);
      },
    }),
    getProductById: builder.query({
      query: (productId) => `/products/${productId}`,
      transformResponse: (res: any) => {
        return res.data;
      },
    }),
  }),
});

export const { useGetProductsQuery, useGetProductByIdQuery } = productApiSlice;
