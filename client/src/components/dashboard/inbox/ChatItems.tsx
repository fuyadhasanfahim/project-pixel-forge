import { RootState } from '@/app/store'
import IUser from '@/types/userInterface'
import { useSelector } from 'react-redux'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Link } from 'react-router-dom'

export default function ChatItems() {
    const { user } = useSelector((state: RootState) => state.auth)
    const { profileImage, name } = user as IUser

    return (
        <Link to={'/dashboard/inbox'}>
            <div className="flex items-center gap-x-3 border p-2 rounded-lg hover:bg-gray-100  duration-300 transition-all mx-2 my-2">
                <Avatar>
                    <AvatarImage src={profileImage} />
                </Avatar>

                <div className="w-full">
                    <h3 className="text-lg">{name}</h3>
                    <div className="flex items-center justify-between gap-2 w-full">
                        <p>Lorem ipsum dolor sit amet.</p>
                        <span className="text-xs">
                            {new Date().toLocaleTimeString()}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    )
}
