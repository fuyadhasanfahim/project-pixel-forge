import { apiSlice } from '../api/apiSlice'

export const conversationApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllConversations: builder.query({
            query: () => ({
                url: '/messages/get-all-conversations',
                method: 'GET',
            }),
            providesTags: ['Conversations'],
        }),
    }),
})

export const { useGetAllConversationsQuery } = conversationApi
