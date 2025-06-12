import { db } from '@/lib/firebase';
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
  Timestamp
} from 'firebase/firestore';

const tradesRef = collection(db, 'trades');

export const addTrade = async (userId: string, trade: any) => {
  return await addDoc(tradesRef, {
    ...trade,
    userId,
    createdAt: Timestamp.now(),
  });
};

export const updateTrade = async (id: string, updates: any) => {
  const tradeDoc = doc(db, 'trades', id);
  return await updateDoc(tradeDoc, updates);
};

export const deleteTrade = async (id: string) => {
  const tradeDoc = doc(db, 'trades', id);
  return await deleteDoc(tradeDoc);
};

export const subscribeToTrades = (userId: string, callback: (trades: any[]) => void) => {
  const q = query(tradesRef, orderBy('createdAt', 'desc'));
  return onSnapshot(q, (snapshot) => {
    const trades = snapshot.docs
      .map(doc => ({ id: doc.id, ...doc.data() }))
      .filter((trade: any) => trade.userId === userId);
    callback(trades);
  });
};
