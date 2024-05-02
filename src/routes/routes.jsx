import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../Layouts/MainLayout';
import Home from '../pages/Home/Home/Home';
import CategoryPage from '../pages/CategoryPage/CategoryPage/CategoryPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/products/:category',
        element: <CategoryPage />,
      },
    ],
  },
]);

export default router;
