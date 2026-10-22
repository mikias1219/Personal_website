import { useSearchParams } from 'react-router-dom';
import { positioning, type PositioningKey } from '../data/profile';

/** The positioning variant chosen by `?for=ai|backend|fullstack`, else the default. */
export function usePositioning() {
  const [params] = useSearchParams();
  const key = params.get('for');
  const variant: PositioningKey = key && key in positioning ? (key as PositioningKey) : 'default';
  return { key: variant, ...positioning[variant] };
}
