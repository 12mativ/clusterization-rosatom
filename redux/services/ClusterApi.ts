import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type User = {
  id: number;
  name: string;
  email: number;
};

export const clusterApi = createApi({
  reducerPath: "clusterApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/",
  }),
  endpoints: (builder) => ({
    clusterFile: builder.mutation({
      query: (file: File) => ({
        url: '/posts',
        method: 'POST',
        body: file,
      })
    }),
    clusterTextHist: builder.mutation({
      query: (answers) => ({
        url: '/predict',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
        method: 'POST',
        body: JSON.stringify({answers: answers}),
      })
    }),
    clusterTextScatter: builder.mutation({
      query: (answers) => ({
        url: '/points',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
        method: 'POST',
        body: JSON.stringify({answers: answers}),
      })
    })
  }),
});

export const { useClusterFileMutation, useClusterTextHistMutation } = clusterApi;