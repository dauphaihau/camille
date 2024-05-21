import React from 'react';

interface DashboardHeaderProps {
  heading: string;
  text?: string | null;
  children?: React.ReactNode;
}

export function DashboardHeader({
  heading,
  text,
  children,
}: DashboardHeaderProps) {
  return (
    <div className='flex justify-between'>
      <div>
        <h1 className='text-2xl font-bold tracking-wide text-slate-900'>
          { heading }
        </h1>
        { text && <div className='text-primary'>{ text }</div> }
      </div>
      { children }
    </div>
  );
}
