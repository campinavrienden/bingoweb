import React from 'react';

type NumbersGridProps = {
  total: number;
  drawn: number[];
};

export const NumbersGrid: React.FC<Readonly<NumbersGridProps>> = ({ total, drawn }) => {
  const lastDrawn = drawn[drawn.length - 1];
//   const prevDrawn = drawn.slice(0, -1);

  const numbers = Array.from({ length: total }, (_, i) => i + 1);

  return (
    <div className="justify-self-center grid gap-2 grid-cols-[repeat(auto-fill,minmax(4rem,1fr))] p-4 max-w-[calc(20*2.5rem)]">
      {numbers.map((num) => {
        const isDrawn = drawn.includes(num);
        const isLast = num === lastDrawn;

        let className =
          'w-full aspect-square flex items-center justify-center border rounded text-sm font-medium transition';

        if (isLast) {
          className += ' bg-yellow-400 text-black animate-pulse';
        } else if (isDrawn) {
          className += ' bg-blue-600 text-white';
        } else {
          className += ' bg-gray-100 text-gray-800';
        }

        return (
          <div key={num} className={className}>
            {num}
          </div>
        );
      })}
    </div>
  );
};
