import React from 'react';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import Home from './pages/Home';

const NotFound = React.lazy(() => import('./pages/NotFound'));

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: '/', element: <Home /> },
      // About and contact used to be separate pages; keep old links working
      { path: '/about', element: <Navigate to="/#about" replace /> },
      { path: '/contact', element: <Navigate to="/#contact" replace /> },
      // Project deep links from search engines: land on the home page instead
      { path: '/work', element: <Navigate to="/#projects" replace /> },
      { path: '/work/:slug', element: <Navigate to="/#projects" replace /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);

const App: React.FC = () => <RouterProvider router={router} />;

export default App;
