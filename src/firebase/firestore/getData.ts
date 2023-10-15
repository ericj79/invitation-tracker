import firebase_app from "../config";
import { getAuth, signInAnonymously } from "firebase/auth";
import { getFirestore, collection, getDocs, QuerySnapshot, DocumentData, Timestamp, query, onSnapshot } from "firebase/firestore";

interface document {
    timestamp: Timestamp,
    count: number
};

// The number of milliseconds in one day
const ONE_DAY = 1000 * 60 * 60 * 24;

function daysBetween(date1: number, date2: number) {
    // Calculate the difference in milliseconds
    const differenceMs = Math.abs(date1 - date2);
    // Convert back to days and return
    return Math.floor(differenceMs / ONE_DAY);
}

export default async function getData(setTotalCount: (a: number) => void, setActualData: (a: number[]) => void) {
    const auth = getAuth(firebase_app);
    if (auth.currentUser == null) {
        await signInAnonymously(auth);
    }
    console.log(auth.currentUser)
    const db = getFirestore(firebase_app)


    const q = query(collection(db, "service"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const list: (DocumentData | document)[] = [];
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            list.push(doc.data());
        });
        list.sort((a: DocumentData | document, b: DocumentData | document) => {
            if (a.timestamp?.seconds > b.timestamp?.seconds) return 1;
            if (a.timestamp?.seconds == b.timestamp?.seconds) return 0;
            return -1;
        });

        let latestDate = new Date(2023, 9, 1);
        let dataSet: number[] = [0];
        let currentTotal = 0;


        while (list.length > 0) {
            const current = list.shift() as DocumentData;
            const currentStamp = new Timestamp(current?.timestamp.seconds, current?.timestamp.nanoseconds);
            const daysSinceLatest = daysBetween(currentStamp.toDate().getTime(), latestDate.getTime());
            console.info(currentStamp.toDate().toDateString() + ": " + current?.count + " - ", current?.description )
            for (let x = 0; x < daysSinceLatest; x++) {
                dataSet.push(currentTotal);
            }
            currentTotal += current?.count;
            dataSet[dataSet.length - 1] = currentTotal;
            latestDate.setDate(latestDate.getDate() + daysSinceLatest);
        }
        let today = new Date();
        today.setHours(0);
        today.setMinutes(0);
        today.setSeconds(0);
        today.setMilliseconds(0);
        const daysSinceLatest = daysBetween(today.getTime(), latestDate.getTime());
        for (let x = 0; x < daysSinceLatest; x++) {
            dataSet.push(currentTotal);
        }

        setTotalCount(currentTotal);
        setActualData(dataSet);
        console.log(dataSet)
    });


}