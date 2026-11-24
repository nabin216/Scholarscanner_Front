"use client";

import { useEffect, useState } from 'react';

// "12 days left" counted in the visitor's browser, so it stays right between daily rebuilds.
// Renders nothing on the server to avoid a hydration mismatch.
export default function DaysLeft({ deadline, className = '' }: { deadline: string; className?: string }) {
  const [left, setLeft] = useState<number | null>(null);

  useEffect(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const [y, m, d] = deadline.split('-').map(Number);
    setLeft(Math.round((new Date(y, m - 1, d).getTime() - today.getTime()) / 86_400_000));
  }, [deadline]);

  if (left === null) return null;
  const text = left < 0 ? 'Deadline has passed' : left === 0 ? 'Closes today' : `${left} day${left === 1 ? '' : 's'} left`;
  const tone = left < 0 ? 'text-red-600' : left <= 30 ? 'text-amber-600' : 'text-emerald-600';
  return <span className={`${tone} ${className}`}>{text}</span>;
}
