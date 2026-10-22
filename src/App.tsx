import React, { lazy } from 'react';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import Home from './pages/Home';

const Work = lazy(() => import('./pages/Work'));
const CaseStudy = lazy(() => import('./pages/CaseStudy'));
const NotFound = lazy(() => import('./pages/NotFound'));

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/work', element: <Work /> },
      { path: '/work/:slug', element: <CaseStudy /> },
      // About and contact used to be separate pages; keep old links working
      { path: '/about', element: <Navigate to="/#about" replace /> },
      { path: '/contact', element: <Navigate to="/#contact" replace /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);

const App: React.FC = () => <RouterProvider router={router} />;

export default App;
