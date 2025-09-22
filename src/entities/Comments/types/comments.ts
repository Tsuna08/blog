import { Timestamp } from "firebase/firestore";

export interface IComment {
  id: string;
  uid: string;
  displayName: string | null;
  createdAt: Date | Timestamp;
  text: string;
}
