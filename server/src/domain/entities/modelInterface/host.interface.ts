export interface IHost{
    id?:string
    name?: string;
    email?: string;
    phone?: string;
    password?: string;
    location?: string;
    role?:string;
    profile_pic?: string;
    isBlocked?:boolean;
    isVerfied?:boolean;
    isSubscriber?:boolean;
    isActive?:boolean;
    listedAssets?:number;
    totalRequests?:number;
    acceptedRequests?:number
    rejectedRequests?:number;
    timestamp?: Date;
}
