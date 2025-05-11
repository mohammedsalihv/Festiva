import React from 'react';
import classNames from 'classnames';

type LoaderProps = {
  size?: number | string; // e.g. 62 or '4rem'
  color?: string; // e.g. '#fff' or 'rgb(255,255,255)'
  className?: string; // Optional for additional custom classes
};

const Loader: React.FC<LoaderProps> = ({ size = 62, color = '#000000', className = '' }) => {
  const pxSize = typeof size === 'number' ? `${size}px` : size;

  return (
    <span
      className={classNames(
        'relative animate-moveX bg-repeat-x',
        className
      )}
      style={{
        width: pxSize,
        height: pxSize,
        backgroundImage: `linear-gradient(to right, ${color} 20%, transparent 21%)`,
        backgroundSize: '36px 8px',
        backgroundPosition: '9px bottom',
      }}
    >
      <span
        className="absolute animate-rotateLoader rounded-sm"
        style={{
          width: '40px',
          height: '40px',
          backgroundColor: color,
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      ></span>
    </span>
  );
};

export default Loader;
