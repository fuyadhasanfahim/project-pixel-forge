import { Router } from 'express'
import { UserRoutes } from '../modules/users/user.routes'
import { OrdersRoutes } from '../modules/orders/orders.routes'

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
]

moduleRoutes.forEach((moduleRoute) => {
    const { path, route } = moduleRoute

    return router.use(path, route)
})

export default router
