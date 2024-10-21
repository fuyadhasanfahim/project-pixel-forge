import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Send } from 'lucide-react'
import Message from './Message'
import { RootState } from '@/app/store'
import { useSelector } from 'react-redux'
import IUser from '@/types/userInterface'
import { Avatar, AvatarImage } from '@/components/ui/avatar'

export default function Messages() {
    const { user } = useSelector((state: RootState) => state.auth)
    const { profileImage, name } = user as IUser

    return (
        <div className="flex flex-col h-screen w-3/4 bg-white border-l">
            <div className="border-b flex items-center gap-2 p-[7.5px]">
                <Avatar>
                    <AvatarImage src={profileImage} />
                </Avatar>
                <div className="flex flex-col">
                    <p>{name}</p>
                    <span className="text-sm">Active now</span>
                </div>
            </div>
            <ScrollArea className="flex-1">
                <Message />
            </ScrollArea>

            <div className="flex items-center gap-2 p-2 bg-white border-t shadow-md">
                <Input
                    placeholder="Type a message..."
                    className="flex-1 focus:ring-0 focus:outline-none rounded-lg p-2 border"
                />
                <Button aria-label="Send Message">
                    <Send className="text-white h-5 w-5" />
                </Button>
            </div>
        </div>
    )
}
