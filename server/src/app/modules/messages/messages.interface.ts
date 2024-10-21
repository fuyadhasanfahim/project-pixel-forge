import { Types } from 'mongoose'

interface IMessage {
    _id: Types.ObjectId
    conversationId: Types.ObjectId
    senderId: Types.ObjectId
    recipientId: Types.ObjectId
    content: string
    isRead: boolean
    replies?: IMessage[]
}

interface IConversation {
    _id: Types.ObjectId
    participants: string[]
    messages: IMessage[]
}

export { IConversation, IMessage }
