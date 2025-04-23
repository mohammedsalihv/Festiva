export interface Ihost{
    _id?: string;
    name?:string;
    phone?:string;
    password?:string;
    location?:string;
    email?:string;
    profile_pic:string;
    isActive?: boolean;
    timestamp?: Date;
    is_blocked?: boolean;
}
