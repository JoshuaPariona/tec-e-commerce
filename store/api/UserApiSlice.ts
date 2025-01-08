import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApiSlice = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api/users" }),
  endpoints: (builder) => ({
    patchUserDeviceToken: builder.mutation({
      query: ({ userId, deviceToken }) => ({
        url: `/${userId}/deviceToken`,
        method: "PATCH",
        body: { deviceToken },
      }),
    }),
  }),
});

export const { usePatchUserDeviceTokenMutation } = userApiSlice;