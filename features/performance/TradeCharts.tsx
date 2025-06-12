'use client';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useEffect, useState } from 'react';
import { subscribeToTrades } from '@/features/tradeLogs/firestore';

export default function TradeCharts({ userId }: { userId: string }) {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const unsub = subscribeToTrades(userId, trades => {
      const chartData = trades.map((t, index) => ({
        name: `T${index + 1}`,
        profit: t.result === 'win' ? t.amount : -t.amount,
        cumulative: 0, // we'll calculate next
      }));

      let cumulative = 0;
      chartData.forEach(d => {
        cumulative += d.profit;
        d.cumulative = cumulative;
      });

      setData(chartData);
    });

    return () => unsub();
  }, [userId]);

  return (
    <div className="p-4 border rounded bg-white dark:bg-gray-800">
      <h2 className="text-lg font-semibold mb-4">Performance Chart</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="profit" stroke="#8884d8" name="Profit/Loss" />
          <Line type="monotone" dataKey="cumulative" stroke="#82ca9d" name="Cumulative P/L" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
