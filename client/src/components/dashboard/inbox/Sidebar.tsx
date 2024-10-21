import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import ChatItems from './ChatItems'

export default function Sidebar() {
    return (
        <div className={cn('w-1/4 h-full')}>
            <h2 className={cn('text-2xl mb-4 font-bold border-b p-[13.5px]')}>
                Inbox
            </h2>
            <ScrollArea className="h-[calc(100vh-100px)]">
                <ChatItems />
            </ScrollArea>
        </div>
    )
}
