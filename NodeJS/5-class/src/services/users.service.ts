import { QueryTypes } from "sequelize";
import { sequelize } from '../config/db';

export interface UserData {
    id?: string;
    name: string;
    email?: string;
    userId?: string;
}

export const createUser = async (data: UserData): Promise<UserData> => {
    const [results] = await sequelize.query(
        `INSERT INTO Users (id, name, email) VALUES (:id, :name, :email) RETURNING *`,
        {
            replacements: { id: data.id, name: data.name, email: data.email || null },
            type: QueryTypes.SELECT
        }
    );
    
    const result = results as UserData[];
    console.log('User created: ', JSON.stringify(result[0]))
    return result[0] || data;
}

export const getAllUsers = async (): Promise<UserData[]> => {
    const results = await sequelize.query(
        `SELECT * FROM Users`,
        {
            type: QueryTypes.SELECT
        }
    ) as UserData[];
    
    console.log('Users fetched: ', JSON.stringify(results))
    return results;
}

export const getUserById = async (id: string): Promise<UserData | null> => {
    const [results] = await sequelize.query(
        `SELECT * FROM Users WHERE id = :id`,
        {
            replacements: { id },
            type: QueryTypes.SELECT
        }
    );
    
    const result = results as UserData[];
    console.log('User fetched: ', JSON.stringify(result[0]))
    return result.length > 0 ? (result[0] || null) : null;
}

export const updateUser = async (id: string, data: Partial<UserData>): Promise<UserData | null> => {
    const updates: string[] = [];
    const replacements: any = { id };
    
    if (data.name !== undefined) {
        updates.push('name = :name');
        replacements.name = data.name;
    }
    
    if (data.email !== undefined) {
        updates.push('email = :email');
        replacements.email = data.email;
    }
    
    if (updates.length === 0) {
        return getUserById(id);
    }
    
    const sql = `UPDATE Users SET ${updates.join(', ')} WHERE id = :id RETURNING *`;
    const [results] = await sequelize.query(sql, {
        replacements,
        type: QueryTypes.SELECT
    });
    
    const result = results as UserData[];
    console.log('User updated: ', JSON.stringify(result[0]))
    return result.length > 0 ? (result[0] || null) : null;
}

export const deleteUser = async (id: string): Promise<boolean> => {
    const [, metadata] = await sequelize.query(
        `DELETE FROM Users WHERE id = :id`,
        {
            replacements: { id }
        }
    );
    
    console.log('User deleted: ', id)
    return (metadata as number) > 0;
}

