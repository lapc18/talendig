export interface BaseEntity {
    uid: string | null;
    creationDate?: string;
    deletedAt?: string;
    updatedAt?: string;
    updatedBy?: string;
    isDeleted?: boolean;
}