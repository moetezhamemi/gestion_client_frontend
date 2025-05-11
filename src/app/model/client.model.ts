import { Type } from "./type.model";

export class Client {
    idclient?: number;
    nomclient?: string;
    emailclient?: string;
    adresseclient? : string;
    dateinscription?: Date;
    type!: Type;
}