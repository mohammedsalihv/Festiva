import { IVenue } from "../../serviceInterface/interface.venue";

export interface IVenueRepository{
    addVenue(venue:IVenue) : Promise<IVenue>
}