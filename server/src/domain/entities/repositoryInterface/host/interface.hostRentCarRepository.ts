import { IRentCar } from "../../serviceInterface/interface.rentCar"

export interface IHostRentCarRepository{
    addRentCar(rentCar:IRentCar) : Promise<IRentCar>
}