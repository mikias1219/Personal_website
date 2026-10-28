import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Toaster from '../components/Toaster';
import ScrollManager from '../components/ScrollManager';
import ChatBot from '../components/ChatBot';

const RootLayout: React.FC = () => (
  <>
    <a href="#main" className="skip-link">Skip to content</a>
    <ScrollManager />
    <Header />
    <main id="main" tabIndex={-1}>
      <Suspense fallback={<div className="page-loading" aria-busy="true" />}>
        <Outlet />
      </Suspense>
    </main>
    <Footer />
    <ChatBot />
    <Toaster />
  </>
);

export default RootLayout;
