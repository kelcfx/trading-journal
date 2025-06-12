'use client';
import { useEffect, useState } from 'react';
import { subscribeToTrades } from './firestore';
import { downloadCSV } from '@/utils/export';

export default function ExportButton({ userId }: { userId: string }) {
  const [trades, setTrades] = useState<any[]>([]);

  useEffect(() => {
    const unsub = subscribeToTrades(userId, setTrades);
    return () => unsub();
  }, [userId]);

  const handleExport = () => {
    downloadCSV(trades, 'trades_export.csv');
  };

  return (
    <button onClick={handleExport} className="px-4 py-2 bg-blue-600 text-white rounded">
      Export to CSV
    </button>
  );
}
