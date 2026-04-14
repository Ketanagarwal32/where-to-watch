import { createBrowserRouter, Navigate } from 'react-router';
import { Layout } from './components/Layout';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Trending } from './pages/Trending';
import { Search } from './pages/Search';
import { Platforms } from './pages/Platforms';
import { Watchlist } from './pages/Watchlist';

export const router = createBrowserRouter([
  {
    path: '/login',
    Component: Login,
  },
  {
    path: '/signup',
    Component: Signup,
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, Component: Trending },
      { path: 'search', Component: Search },
      { path: 'platforms', Component: Platforms },
      { path: 'watchlist', Component: Watchlist },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/login" replace />,
  },
]);
