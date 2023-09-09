import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type User = {
  id: number;
  name: string;
  email: number;
};

export const clusterApi = createApi({
  reducerPath: "clusterApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:5000/",
  }),
  endpoints: (builder) => ({
    clusterFile: builder.mutation({
      query: (file: File) => ({
        url: '/posts',
        method: 'POST',
        body: file,
      })
    }),
    clusterText: builder.mutation({
      query: (answers) => ({
        url: '/predict',
        method: 'POST',
        body: {answers: answers},
      })
    })
  }),
});

export const { useClusterFileMutation, useClusterTextMutation } = clusterApi;