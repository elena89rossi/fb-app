import { GenderType } from "../static-entities/gender/gender.type";
import { UserStatusType } from "../static-entities/user-status/user-status.type";

export interface IUser {
    id?:number;
    name: string;
    email: string;
    gender: GenderType;
    status: UserStatusType;
}
