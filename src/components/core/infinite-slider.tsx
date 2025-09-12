import React, { ReactNode, useRef, useState } from 'react';

interface InfiniteSliderProps {
  children: ReactNode;
  speedOnHover?: number;
  gap?: number;
}

export function InfiniteSlider({ children, speedOnHover = 8, gap = 24 }: InfiniteSliderProps) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const sliderStyle: React.CSSProperties = {
    display: 'flex',
    gap: `${gap}px`,
    animation: `infinite-scroll ${isHovered ? speedOnHover : 16}s linear infinite`,
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ overflow: 'hidden', width: '100%' }}
    >
      <div ref={sliderRef} style={sliderStyle}>
        {children}
        {children}
      </div>
      <style>{`
        @keyframes infinite-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
