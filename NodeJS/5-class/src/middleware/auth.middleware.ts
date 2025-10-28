import { NextFunction, Response } from "express";
import { fb } from '../config/firebase';

export const verifyToken = async (req: any, res: Response, next: NextFunction) => {
    const headers = req.headers.authorization; //Bearer token-here
    if (!headers || headers.split(' ').length !== 2) {
        return res.status(401).json({ message: 'You are not autorized, try with another account.' });
    }

    try {
        const token = headers.split(' ')[1] || ''; //Bearer token-here
        console.log('token', token);
        const decoded = await fb.auth.verifyIdToken(token, true);

        req['user'] = decoded;

        next();
        return;
    } catch (err) {
        return res.status(403).json({ message: 'Token expired or invalid' })
    }
}
