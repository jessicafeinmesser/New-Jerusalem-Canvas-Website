import { collection, addDoc, getDocs, query, orderBy, serverTimestamp, Timestamp } from 'firebase/firestore';
import { db, handleFirestoreError } from '../lib/firebase';

const INQUIRIES_COLLECTION = 'inquiries';

export interface InquiryData {
  id?: string;
  name: string;
  email: string;
  type: string;
  message: string;
  createdAt?: Timestamp;
}

export async function submitInquiry(data: InquiryData) {
  try {
    const docRef = await addDoc(collection(db, INQUIRIES_COLLECTION), {
      ...data,
      createdAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    handleFirestoreError(error, 'create', INQUIRIES_COLLECTION);
  }
}

export async function getInquiries() {
  try {
    const q = query(collection(db, INQUIRIES_COLLECTION), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as InquiryData[];
  } catch (error) {
    handleFirestoreError(error, 'get', INQUIRIES_COLLECTION);
    return [];
  }
}
