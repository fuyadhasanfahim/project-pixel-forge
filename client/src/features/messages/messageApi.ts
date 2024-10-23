import { apiSlice } from '../api/apiSlice'
import { addMessage, setMessages } from '@/features/messages/messageSlice'
import IMessage from '@/types/messageInterface'

export const messageApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getMessage: builder.query<IMessage[], string>({
            query: (conversationId) => ({
                url: `/messages/get-message/${conversationId}`,
                method: 'GET',
            }),
            providesTags: ['Messages', 'Conversations'],
            keepUnusedDataFor: 0,
            async onQueryStarted(
                _conversationId,
                { dispatch, queryFulfilled },
            ) {
                try {
                    const { data } = await queryFulfilled
                    dispatch(setMessages(data))
                } catch (error) {
                    console.error('Error fetching messages:', error)
                }
            },
        }),
        setMessage: builder.mutation<IMessage, Partial<IMessage>>({
            query: (data) => ({
                url: '/messages/set-message',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Messages'],
            async onQueryStarted(_message, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    dispatch(addMessage(data))
                } catch (error) {
                    console.error('Error adding message:', error)
                }
            },
        }),
    }),
})

export const { useGetMessageQuery, useSetMessageMutation } = messageApi
