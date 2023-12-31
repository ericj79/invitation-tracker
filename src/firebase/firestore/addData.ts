import firebase_app from "../config";
import { getFirestore, doc, setDoc, Timestamp } from "firebase/firestore";

const db = getFirestore(firebase_app)
export default async function addData(count: number, comment: string, justServe: boolean) {
    let result = null;
    let error = null;

    try {
        let data = 
        {
            timestamp: Timestamp.now(),
            count: count,
            description: comment,
            justServe: justServe
        };
        result = await setDoc(doc(db, 'service', crypto.randomUUID()), 
        data, {
            merge: true,
        });
    } catch (e) {
        error = e;
    }

    return { result, error };
}