'use client';
import { useEffect, useState } from 'react';
import { subscribeToTrades } from '@/features/tradeLogs/firestore';
import { format, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';

export default function TradeCalendar({ userId }: { userId: string }) {
  const [trades, setTrades] = useState<any[]>([]);
  const [calendar, setCalendar] = useState<any[]>([]);

  useEffect(() => {
    const unsub = subscribeToTrades(userId, (allTrades) => {
      setTrades(allTrades);
    });
    return () => unsub();
  }, [userId]);

  useEffect(() => {
    const today = new Date();
    const monthDays = eachDayOfInterval({ start: startOfMonth(today), end: endOfMonth(today) });

    const calendarData = monthDays.map(day => {
      const dayStr = format(day, 'yyyy-MM-dd');
      const dayTrades = trades.filter((t: any) => {
        if (!t.createdAt?.seconds) return false;
        const tradeDate = format(new Date(t.createdAt.seconds * 1000), 'yyyy-MM-dd');
        return tradeDate === dayStr;
      });

      const profit = dayTrades.reduce((sum, t) => sum + (t.result === 'win' ? t.amount : -t.amount), 0);

      return { date: dayStr, profit };
    });

    setCalendar(calendarData);
  }, [trades]);

  return (
    <div className="p-4 border rounded bg-white dark:bg-gray-800">
      <h2 className="text-lg font-semibold mb-4">Monthly Trade Calendar</h2>
      <div className="grid grid-cols-7 gap-2 text-center text-sm">
        {calendar.map((day) => (
          <div key={day.date} className={`p-2 rounded ${day.profit === 0 ? 'bg-gray-200 dark:bg-gray-700' : day.profit > 0 ? 'bg-green-300 dark:bg-green-700' : 'bg-red-300 dark:bg-red-700'}`}>
            <div>{format(new Date(day.date), 'd')}</div>
            <div>{day.profit !== 0 ? `$${day.profit}` : '-'}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
