import * as React from 'react';
import { useState } from 'react';

export interface ILogoProps {
  fontSize?: string;
}

export function Logo(props: ILogoProps) {
  const { fontSize  } = props;
  const [isWiggling, setIsWiggling] = useState(false);
  
  // Toggle wiggling on mouse enter/leave
  const handleMouseEnter = () => {
    setIsWiggling(true);
  };
  
  const handleMouseLeave = () => {
    setIsWiggling(false);
  };
  
  // Animation styles
  const containerStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'default',
    width: 'auto',
    height: 'auto',
  };
  
  const iconStyle = {
    fontSize: fontSize ? `${fontSize}px` : '24px',
    fontWeight: 'bold',
    display: 'inline-block',
    transformOrigin: 'bottom center',
    animation: isWiggling 
      ? 'wiggle 0.5s ease-in-out infinite alternate' 
      : 'none',
  };
  
  return (
    <>
      <span 
        style={containerStyle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => setIsWiggling(!isWiggling)}
      >
        <span style={iconStyle} className="logo-icon">{'/>'}</span>
      </span>
      {" "}
    </>
  );
}