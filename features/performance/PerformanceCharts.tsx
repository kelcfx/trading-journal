'use client';
import { useEffect, useState } from 'react';
import { subscribeToTrades } from '@/features/tradeLogs/firestore';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const COLORS = ['#34d399', '#f87171']; // green for wins, red for losses

export default function PerformanceCharts({ userId }: { userId: string }) {
  const [trades, setTrades] = useState<any[]>([]);

  useEffect(() => {
    const unsub = subscribeToTrades(userId, setTrades);
    return () => unsub();
  }, [userId]);

  const resultCounts = trades.reduce(
    (acc, trade) => {
      if (trade.result === 'win') acc.wins += 1;
      if (trade.result === 'loss') acc.losses += 1;
      return acc;
    },
    { wins: 0, losses: 0 }
  );

  const barData = trades.map(trade => ({
    symbol: trade.symbol,
    amount: trade.amount * (trade.result === 'win' ? 1 : -1),
  }));

  const pieData = [
    { name: 'Wins', value: resultCounts.wins },
    { name: 'Losses', value: resultCounts.losses },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-white dark:bg-gray-900 p-4 rounded shadow">
        <h2 className="font-bold mb-2">Profit/Loss by Trade</h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={barData}>
            <XAxis dataKey="symbol" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="amount" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white dark:bg-gray-900 p-4 rounded shadow">
        <h2 className="font-bold mb-2">Win/Loss Ratio</h2>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
