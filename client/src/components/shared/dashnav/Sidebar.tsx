import {
    ShoppingCart,
    Users,
    Home,
    PlusSquare,
    DollarSign,
    Settings,
    CircleUser,
    Slack,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Link, useLocation } from 'react-router-dom'

export default function Sidebar() {
    const location = useLocation()

    return (
        <div className="hidden border-r bg-muted/40 md:block h-full">
            <div className="flex h-full max-h-screen flex-col gap-2">
                <div className="flex justify-between gap-2 h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                    <Link
                        to={'/'}
                        className="flex items-center gap-2 font-semibold"
                    >
                        <Slack className="h-6 w-6" />
                        <span className="">Project Pixel Forge</span>
                    </Link>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="secondary"
                                size="icon"
                                className="rounded-full"
                            >
                                <CircleUser className="h-5 w-5" />
                                <span className="sr-only">
                                    Toggle user menu
                                </span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Settings</DropdownMenuItem>
                            <DropdownMenuItem>Support</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Logout</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <div className="flex-1 overflow-y-auto">
                    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                        <Link
                            to={'/dashboard'}
                            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${location.pathname == '/dashboard' && 'text-primary'}`}
                        >
                            <Home className="h-4 w-4" />
                            Dashboard
                        </Link>
                        <Link
                            to={'/dashboard/add-order'}
                            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${location.pathname == '/dashboard/add-order' && 'text-primary'}`}
                        >
                            <PlusSquare className="h-4 w-4" />
                            Add Order
                        </Link>
                        <Link
                            to={'/dashboard/previous-orders'}
                            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${location.pathname == '/dashboard/previous-orders' && 'text-primary'}`}
                        >
                            <ShoppingCart className="h-4 w-4" />
                            Previous Orders
                            <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                                6
                            </Badge>
                        </Link>
                        <Link
                            to={'/dashboard/invoices'}
                            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${location.pathname == '/dashboard/invoice' && 'text-primary'}`}
                        >
                            <DollarSign className="h-4 w-4" />
                            Invoices
                        </Link>
                        <Link
                            to={'/dashboard/customer-support'}
                            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${location.pathname == '/dashboard/customer-service' && 'text-primary'}`}
                        >
                            <Users className="h-4 w-4" />
                            Customer Support
                        </Link>
                        <button className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
                            <Settings className="h-4 w-4" />
                            Settings
                        </button>
                    </nav>
                </div>
            </div>
        </div>
    )
}