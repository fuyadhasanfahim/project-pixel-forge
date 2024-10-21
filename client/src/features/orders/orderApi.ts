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
        fetchAllOrders: builder.query({
            query: () => `/orders/get-all-orders`,
            providesTags: (result) =>
                result
                    ? result?.orders.map(({ _id }: { _id: string }) => ({
                          type: 'Orders',
                          id: _id,
                      }))
                    : ['Orders'],
        }),
        updateOrder: builder.mutation({
            query: ({ orderId, updateData }) => ({
                url: `/orders/update-order/${orderId}`,
                method: 'PUT',
                body: updateData,
            }),
            invalidatesTags: (result, error, { orderId }) => [
                { type: 'Orders', id: orderId },
                'Orders',
            ],
        }),
    }),
})

export const {
    usePostOrderMutation,
    useFetchOrderByUserIdQuery,
    useFetchOrderByOrderIdQuery,
    useFetchAllOrdersQuery,
    useUpdateOrderMutation,
} = orderApi
