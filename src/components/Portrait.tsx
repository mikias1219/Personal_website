import React from 'react';
import casual480 from '../assets/portrait-casual-480.webp';
import casual800 from '../assets/portrait-casual-800.webp';
import casualJpg from '../assets/portrait-casual-480.jpg';
import suit480 from '../assets/portrait-suit-480.webp';
import suit800 from '../assets/portrait-suit-800.webp';
import suitJpg from '../assets/portrait-suit-480.jpg';

const photos = {
  casual: {
    small: casual480,
    large: casual800,
    fallback: casualJpg,
    alt: 'Mikias Abate in a blue checked shirt, arms crossed, against a light wall',
  },
  suit: {
    small: suit480,
    large: suit800,
    fallback: suitJpg,
    alt: 'Mikias Abate in a blue suit and red tie, adjusting his cuff',
  },
};

/** Which photo the site shows. Change to 'suit' to use the formal portrait everywhere. */
const ACTIVE_PHOTO: keyof typeof photos = 'casual';

interface Props {
  priority?: boolean;
  className?: string;
  sizes?: string;
}

const Portrait: React.FC<Props> = ({ priority = false, className = '', sizes = '(min-width: 1024px) 400px, 78vw' }) => {
  const photo = photos[ACTIVE_PHOTO];
  return (
    <picture className={`portrait ${className}`}>
      <source type="image/webp" srcSet={`${photo.small} 480w, ${photo.large} 800w`} sizes={sizes} />
      <img
        src={photo.fallback}
        width={480}
        height={600}
        alt={photo.alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        {...(priority ? { fetchpriority: 'high' } : {})}
      />
    </picture>
  );
};

export default Portrait;
