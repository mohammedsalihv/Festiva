import { IVenue } from "../../modelInterface/venue.interface";

export interface IVenueRepository{
    addVenue(venue:IVenue) : Promise<IVenue>
}