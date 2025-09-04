import { IBooking } from "../../modelInterface/base/interface.booking";
import { IPayment } from "../../modelInterface/base/interface.payment";
import { IReview } from "../../modelInterface/base/interface.review";
import { IHostModel } from "../../modelInterface/host/interface.host";
import { IUserModel } from "../../modelInterface/user/interface.user";
import { INotification } from "../../serviceInterface/base/interface.notification";
import { ICaters } from "../../serviceInterface/host/interface.caters";
import { ILocation } from "../../serviceInterface/host/interface.location";
import { IRentCar } from "../../serviceInterface/host/interface.rentCar";
import { IStudio } from "../../serviceInterface/host/interface.studio";
import { IVenue } from "../../serviceInterface/host/interface.venue";

export interface IAdminDashboardRepository {
  dashboardDatas(): Promise<{
    bookings?: IBooking;
    users?: IUserModel;
    hosts?: IHostModel;
    payments?: IPayment;
    reviews?: IReview;
    notifications?: INotification;
    locations?: ILocation;
    venues?: IVenue;
    rentcars?: IRentCar;
    caters?: ICaters;
    studios?: IStudio;
  }>;
}
