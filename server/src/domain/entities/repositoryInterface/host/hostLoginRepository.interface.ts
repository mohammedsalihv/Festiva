import { Ihost } from "../../modelInterface/host.interface";

export interface IhostRepository{
    findByEmail(email:string) : Promise<Ihost | null>
}