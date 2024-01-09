import { IClient } from "./IClient"

export interface IVehicles{
    id:number,
    client_id:IClient,
    model: string,
    year: number,
    plate: string
}