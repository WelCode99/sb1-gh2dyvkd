import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import Home from '../pages/Home';
import Chat from '../pages/Chat';
import Register from '../pages/Register';

export function AppRoutes() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat/:specialtyId" element={<Chat />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
}