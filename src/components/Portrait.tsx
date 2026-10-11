import React from 'react';
import portrait400 from '../assets/portrait-400.webp';
import portrait640 from '../assets/portrait-640.webp';
import portraitJpg from '../assets/portrait-400.jpg';

interface Props {
  priority?: boolean;
  className?: string;
  sizes?: string;
}

const Portrait: React.FC<Props> = ({ priority = false, className = '', sizes = '(min-width: 1024px) 320px, 60vw' }) => (
  <picture className={`portrait ${className}`}>
    <source type="image/webp" srcSet={`${portrait400} 400w, ${portrait640} 640w`} sizes={sizes} />
    <img
      src={portraitJpg}
      width={400}
      height={500}
      alt="Mikias Abate, standing against a light wall with arms crossed"
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      {...(priority ? { fetchpriority: 'high' } : {})}
    />
  </picture>
);

export default Portrait;
