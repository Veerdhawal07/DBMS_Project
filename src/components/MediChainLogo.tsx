import React from 'react';

interface MediChainLogoProps {
  className?: string;
  width?: number;
  height?: number;
}

const MediChainLogo: React.FC<MediChainLogoProps> = ({ 
  className = "", 
  width = 32, 
  height = 32 
}) => {
  return (
    <img 
      src="/MediChain_logo.png" 
      alt="MediChain Logo" 
      className={className}
      width={width}
      height={height}
    />
  );
};

export default MediChainLogo;