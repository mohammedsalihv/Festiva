export interface EditHostPayload {
    name:string;
    phone:string;
    role: string;
    isActive: boolean;
    isBlocked: boolean;
    location:string;
    isVerfied:boolean;
    isSubscriber:boolean;
    listedAssets:number;
    totalRequests:number;
    acceptedRequests:number;
    rejectedRequests:number;
}