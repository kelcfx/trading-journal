'use client';
import { useState } from 'react';

export default function TradeForm({ onSubmit }: { onSubmit: (data: any) => void }) {
  const [symbol, setSymbol] = useState('');
  const [amount, setAmount] = useState('');
  const [result, setResult] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ symbol, amount: parseFloat(amount), result });
    setSymbol('');
    setAmount('');
    setResult('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <input
        value={symbol}
        onChange={e => setSymbol(e.target.value)}
        placeholder="Symbol"
        className="w-full p-2 border rounded"
        required
      />
      <input
        value={amount}
        onChange={e => setAmount(e.target.value)}
        type="number"
        placeholder="Amount"
        className="w-full p-2 border rounded"
        required
      />
      <select value={result} onChange={e => setResult(e.target.value)} className="w-full p-2 border rounded" required>
        <option value="">Result</option>
        <option value="win">Win</option>
        <option value="loss">Loss</option>
      </select>
      <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">Add Trade</button>
    </form>
  );
}
