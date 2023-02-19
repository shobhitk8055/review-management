import { Suspense } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { Spinner } from '@/components/Elements';
import { MainLayout } from '@/components/Layout';
import { lazyImport } from '@/utils/lazyImport';

const { Dashboard } = lazyImport(() => import('@/features/misc'), 'Dashboard');
const { Employee } = lazyImport(() => import('@/features/employee'), 'Employee');
const { Reviews } = lazyImport(() => import('@/features/reviews'), 'Reviews');
const { Feedback } = lazyImport(() => import('@/features/feedback'), 'Feedback');
const { Requests } = lazyImport(() => import('@/features/reviewRequests'), 'Requests');

const App = () => {
  return (
    <MainLayout>
      <Suspense
        fallback={
          <div className="h-full w-full flex items-center justify-center">
            <Spinner size="xl" />
          </div>
        }
      >
        <Outlet />
      </Suspense>
    </MainLayout>
  );
};

export const protectedRoutes = [
  {
    path: '/app',
    element: <App />,
    children: [
      { path: 'employee', element: <Employee /> },
      { path: 'reviews', element: <Reviews /> },
      { path: 'review-requests', element: <Requests /> },
      { path: 'feedback/:id', element: <Feedback /> },
      { path: '', element: <Dashboard /> },
      { path: '*', element: <Navigate to="." /> },
    ],
  },
];
