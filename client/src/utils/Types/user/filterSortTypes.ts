import { IRentCarBase } from "./rentCarTypes";
import { ICatersBase } from "./catersTypes";
import { IStudioBase } from "./studioTypes";
import { IVenueBase } from "./venueTypes";

export type Asset = IRentCarBase | IVenueBase | ICatersBase | IStudioBase;
export type filterParams = Record<
  string,
  string | number | string[] | number[] | undefined
>;
export type sortParams = Record<string, string | number | undefined>;
