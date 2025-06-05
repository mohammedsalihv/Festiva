export interface EditHostPayload {
    name:string;
    phone:string;
    role: string;
    isActive: boolean;
    isBlocked: boolean;
    location:string;
    isVerified:boolean;
    isSubscriber:boolean;
    listedAssets:number;
    totalRequests:number;
    acceptedRequests:number;
    rejectedRequests:number;
}