import { collection, doc } from "firebase/firestore";

import { db } from "@/app/firebase";

export const collectionName = "articles";
export const collectionFc = () => collection(db, collectionName);
export const docFc = (id: string) => doc(db, collectionName, id);
