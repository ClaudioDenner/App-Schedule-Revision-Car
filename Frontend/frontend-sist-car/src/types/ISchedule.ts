import { IClient } from './IClient'
import { IVehicles } from './IVehicles'

export interface ISchedule{
    id:string
    client_id: IClient,
    vehicle_id: IVehicles,
    date: string,
    service: string,
    detail: string,
    value: string
}