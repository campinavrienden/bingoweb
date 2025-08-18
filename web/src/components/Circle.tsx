import { useEffect, useRef, useState } from 'react';

interface CircleProps {
  number?: number;
  bgColor?: string;
  textColor?: string;
  ratio?: number;
  size?: string;
}

export default function Circle({
  number = undefined,
  bgColor = 'bg-blue-500',
  textColor = 'text-white',
  ratio = 0.6,
  size = 'h-full max-h-full',
}: CircleProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [fontSize, setFontSize] = useState('16px');

  useEffect(() => {
    const resize = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.offsetWidth;
      setFontSize(`${width * ratio}px`);
    };

    const observer = new ResizeObserver(resize);
    if (containerRef.current) observer.observe(containerRef.current);
    resize();

    return () => observer.disconnect();
  }, [number]);

  return (
    <div
      ref={containerRef}
      className={` ${size} aspect-square rounded-full ${bgColor} max-h-h-full flex items-center justify-center overflow-hidden`}
    >
      <span
        className={`font-bold leading-none translate-y-[-5%] block ${textColor}`}
        style={{ fontSize }}
      >
        {number}
      </span>
    </div>
  );
}
