import {Role} from "./enums/role.enum";

export interface User {
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    role: Role;
}
