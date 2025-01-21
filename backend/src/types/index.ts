export interface JWTPayload {
    email: string;
}
export interface AiMessageAttributes {
    id?: number;
    message: string;
    Yourmessage: string;
    userId: Number
}

export interface ArchivedChatTypes {
    id?: number;
    userId?: number;
    GroupId?: number;
    message: String;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface GroupTypes {
    id?: number;
    nameofthegroup: string;
}

export interface MessageModelTypes {
    message?: String;
    filename?: String;
    imgandvideourl?: String;
    GroupId?: number;
    userId?: number;
    createdAt?: Date;
    updatedAt?: Date;
    username: string
}
export interface UserMessagesTypes {
    id: number;
    senderId: number;
    message: string;
    receiverId: number;
}
export interface UserTypes {
    id: number;
    name: string;
    email: string;
    password: string;
    image?: string | null
}
export interface UserGroupsTypes {
    id?: number;
    isAdmin: boolean;
    isstrictGroup?: boolean;
    userId?: number;
    GroupId?: number;
}