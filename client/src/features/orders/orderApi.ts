import { apiSlice } from '../api/apiSlice'

export const orderApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        postOrder: builder.mutation({
            query: (data) => ({
                url: '/orders/create-order',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: [{ type: 'Orders', id: 'LIST' }],
        }),
        fetchOrderByUserId: builder.query({
            query: (userId) => `/orders/get-order/${userId}`,
            providesTags: (result) =>
                result
                    ? [
                          ...result.orders.map(({ _id }: { _id: string }) => ({
                              type: 'Orders' as const,
                              id: _id,
                          })),
                          { type: 'Orders', id: 'LIST' },
                      ]
                    : [{ type: 'Orders', id: 'LIST' }],
        }),
        fetchOrderByOrderId: builder.query({
            query: (orderId) => `/orders/get-order-by-order-id/${orderId}`,
            providesTags: (result) =>
                result ? [{ type: 'Orders', id: result._id }] : ['Orders'],
        }),
    }),
})

export const {
    usePostOrderMutation,
    useFetchOrderByUserIdQuery,
    useFetchOrderByOrderIdQuery,
} = orderApi
