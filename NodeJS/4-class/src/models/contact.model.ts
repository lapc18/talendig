import { BaseEntity } from "../core/base-entity";

export interface Contact extends BaseEntity {
    name: string;
    phoneNumber: string;
    email?: string;
    address?: string;
};