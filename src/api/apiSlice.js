import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://cdn.cur.su/api' }),
    tagTypes: ['Currency'],
    endpoints: builder => ({
        getCurrency: builder.query({
            query: () => '/nbu.json',
            providesTags: ['Currency']
        })
    })
});

export const { useGetCurrencyQuery } = apiSlice;