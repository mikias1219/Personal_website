import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import { useMeta } from '../hooks/useMeta';
import { isMac } from '../lib';

const NotFound: React.FC = () => {
  const { pathname } = useLocation();
  useMeta({ title: 'Page not found', description: 'This page does not exist.', path: pathname });

  return (
    <div className="container page not-found">
      <p className="label">404</p>
      <h1 className="h1">This page doesn’t exist.</h1>
      <p className="lead">
        The link may be old or mistyped. Try the pages below, or press <kbd>{isMac() ? '⌘K' : 'Ctrl K'}</kbd> to search.
      </p>
      <div className="actions">
        <Link to="/" className="btn btn-primary">Back home</Link>
        <Link to="/work" className="btn btn-secondary">
          See projects <FiArrowRight aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
