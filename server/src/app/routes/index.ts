import { Router } from 'express'
import { UserRoutes } from '../modules/users/user.routes'
import { OrdersRoutes } from '../modules/orders/orders.routes'
import { MessagesRoutes } from '../modules/messages/messages.route'
import { ConversationRouter } from '../modules/conversation/conversation.routes'

const router = Router()

const moduleRoutes = [
    {
        path: '/users',
        route: UserRoutes,
    },
    {
        path: '/orders',
        route: OrdersRoutes,
    },
    {
        path: '/messages',
        route: MessagesRoutes,
    },
    {
        path: '/conversations',
        route: ConversationRouter,
    },
]

moduleRoutes.forEach((moduleRoute) => {
    const { path, route } = moduleRoute

    return router.use(path, route)
})

export default router
