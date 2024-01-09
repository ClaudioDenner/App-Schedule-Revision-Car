import { ISchedule } from "./ISchedule";
import { IVehicles } from "./IVehicles";

export interface IClientFull{
    id: number;
    name_complete: string;
    cpf: string;
    phone: string;
    email: string;
    gender: string;
    vehicles: IVehicles[];
    schedules: ISchedule[];
}