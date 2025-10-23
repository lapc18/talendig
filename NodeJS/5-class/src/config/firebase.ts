import { initializeApp, firestore, auth, credential, ServiceAccount } from "firebase-admin";
import serviceAccount from './talendig-firebase-admin-sdk.json';
import { NextFunction, Response } from "express";

initializeApp({
    credential: credential.cert(serviceAccount as ServiceAccount)
})

export const db = firestore();

export const verifyToken = async (req: any, res: Response, next: NextFunction) => {
    const headers = req.headers.authorization; //Bearer token-here
    if (!headers || headers.split(' ').length !== 2) {
        return res.status(401).json({ message: 'You are not autorized, try with another account.' });
    }

    try {
        const token = headers.split(' ')[1] || ''; //Bearer token-here
        const decoded = await auth().verifyIdToken(token);

        req['user'] = decoded;

        next();
        return;
    } catch (err) {
        return res.status(403).json({ message: 'Token expired or invalid' })
    }
}
