interface IUser {
    userId: string
    username: string
    name: string
    email: string
}

interface IMessage {
    sender: IUser
    receiver: IUser
    message: string
}

interface IConversation {
    users: IUser[]
    messages: IMessage[]
}

export { IUser, IConversation, IMessage }
