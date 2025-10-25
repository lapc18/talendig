import { initializeApp, firestore, credential, ServiceAccount, auth, } from "firebase-admin";
import serviceAccount from './talendig-firebase-admin-sdk.json';

initializeApp({
    credential: credential.cert(serviceAccount as ServiceAccount)
})

export const fb = {
    firestore: firestore(),
    auth: auth(),
}
