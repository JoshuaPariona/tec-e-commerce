import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ordersApiSlice = createApi({
  reducerPath: "ordersApi",
  tagTypes: ["newOrder"],
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api/orders" }),
  endpoints: (builder) => ({
    getOrdersByStoreId: builder.query({
      query: (storeId) => `/store/${storeId}`,
      transformResponse: (res: any) => {
        return Object.keys(res.data).map(key => {
          return { id: key, ...res.data[key] };
        });
      },
      providesTags: ['newOrder']
    }),
    getOrderByUserId: builder.query({
      query: (userId) => `/user/${userId}`,
      transformResponse: (res: any) => {
        return Object.keys(res.data).map(key => {
          return { id: key, ...res.data[key] };
        });
      },
      providesTags: ['newOrder']
    }),
    getAllOrders: builder.query({
      query: () => "",
    }),
    postNewOrder: builder.mutation({
      query: (newOrder) => ({
        url: "",
        method: "POST",
        body: newOrder,
      }),
      invalidatesTags: ['newOrder'], 
    }),
    patchOrderStatus: builder.mutation({
      query: ({ orderId, newStatus }) => ({
        url: `/${orderId}/status`,
        method: "PATCH",
        body: { status: newStatus },
      }),
    }),
  }),
});

export const {
  useGetAllOrdersQuery,
  useGetOrderByUserIdQuery,
  useGetOrdersByStoreIdQuery,
  usePatchOrderStatusMutation,
  usePostNewOrderMutation,
} = ordersApiSlice;
