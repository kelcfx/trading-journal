'use client';
import { useEffect, useState } from 'react';
import { subscribeToTrades, deleteTrade } from './firestore';

export default function TradeList({ userId }: { userId: string }) {
  const [trades, setTrades] = useState<any[]>([]);

  useEffect(() => {
    const unsub = subscribeToTrades(userId, setTrades);
    return () => unsub();
  }, [userId]);

  return (
    <div className="space-y-2">
      {trades.map(trade => (
        <div key={trade.id} className="p-2 border rounded flex justify-between">
          <div>
            <strong>{trade.symbol}</strong>: ${trade.amount} — {trade.result}
          </div>
          <button onClick={() => deleteTrade(trade.id)} className="text-red-500">✕</button>
        </div>
      ))}
    </div>
  );
}
