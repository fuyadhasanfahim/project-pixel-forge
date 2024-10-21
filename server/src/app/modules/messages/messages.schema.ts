import { Schema, Types } from 'mongoose'
import { IConversation, IMessage } from './messages.interface'

// Define the Message Schema first without the replies field
const MessageSchema = new Schema<IMessage>(
    {
        _id: {
            type: Schema.Types.ObjectId,
            auto: true,
        },
        conversationId: {
            type: Schema.Types.ObjectId,
            ref: 'Conversation', // Should reference Conversation
            required: true,
        },
        senderId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        recipientId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        isRead: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true },
)

// Add the replies field after defining the schema
MessageSchema.add({
    replies: {
        type: [Schema.Types.ObjectId],
        ref: 'Message', // This references other messages
        default: [],
    },
})

// Conversation Schema
const ConversationSchema = new Schema<IConversation>(
    {
        _id: {
            type: Schema.Types.ObjectId,
            auto: true,
        },
        participants: {
            type: [String], // Should reference User IDs
            ref: 'User',
            required: true,
        },
        messages: {
            type: [MessageSchema], 
            ref: 'Message',
            default: [],
        },
    },
    { timestamps: true },
)

export { MessageSchema, ConversationSchema }
