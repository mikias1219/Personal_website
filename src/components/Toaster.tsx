import React, { useEffect, useState } from 'react';
import { FiCheck } from 'react-icons/fi';

/** Global polite live region; trigger with `toast()` from lib.ts. */
const Toaster: React.FC = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    let timer: number | undefined;
    const onToast = (e: Event) => {
      setMessage((e as CustomEvent<string>).detail);
      window.clearTimeout(timer);
      timer = window.setTimeout(() => setMessage(''), 2400);
    };
    window.addEventListener('toast', onToast);
    return () => {
      window.removeEventListener('toast', onToast);
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <div className="toast-region" role="status" aria-live="polite">
      {message && (
        <div className="toast">
          <FiCheck aria-hidden="true" /> {message}
        </div>
      )}
    </div>
  );
};

export default Toaster;
