import { apiSlice } from '../api/apiSlice'
import { userLoggedIn } from './authSlice'
import Cookies from 'js-cookie'

export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (data) => ({
                url: '/users/auth/create-user',
                method: 'POST',
                body: data,
            }),
            async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
                try {
                    const { data } = await queryFulfilled

                    dispatch(
                        userLoggedIn({
                            user: data.user,
                        }),
                    )

                    Cookies.set('accessToken', data.accessToken, {
                        expires: 7,
                        sameSite: 'Strict',
                        secure: true,
                    })
                } catch (error) {
                    throw new Error((error as Error).message)
                }
            },
        }),
        login: builder.mutation({
            query: (data) => ({
                url: '/users/auth/login',
                method: 'POST',
                body: data,
            }),
            async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
                try {
                    const { data } = await queryFulfilled

                    dispatch(
                        userLoggedIn({
                            user: data.user,
                        }),
                    )

                    Cookies.set('accessToken', data.accessToken, {
                        expires: 7,
                        sameSite: 'lax',
                        secure: true,
                    })
                } catch (error) {
                    throw new Error((error as Error).message)
                }
            },
        }),
        fetchCurrentUser: builder.query({
            query: () => ({
                url: '/users/auth/get-current-user',
                method: 'GET',
                credentials: 'include',
            }),
            async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
                try {
                    const { data } = await queryFulfilled

                    dispatch(
                        userLoggedIn({
                            user: data.user,
                        }),
                    )
                } catch (error) {
                    console.error('Error fetching user:', error)
                }
            },
        }),
        verifyEmail: builder.mutation({
            query: (token) => ({
                url: `/users/auth/verify-email?token=${token}`,
                method: 'GET',
            }),
            async onQueryStarted(_arg, { queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    console.log('Email verified:', data)
                } catch (error) {
                    console.error('Error verifying email:', error)
                }
            },
        }),
    }),
})

export const {
    useRegisterMutation,
    useLoginMutation,
    useFetchCurrentUserQuery,
    useVerifyEmailMutation,
} = authApi