import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../Layouts/MainLayout';
import Home from '../pages/Home/Home/Home';
import CategoryPage from '../pages/CategoryPage/CategoryPage/CategoryPage';
import ProductDetailsPage from '../pages/ProductDetailsPage/ProductDetailsPage/ProductDetailsPage';
import Login from '../pages/Login/Login';
import SignUpPage from '../pages/SignUpPage/SignUpPage';
import MyFavoritePage from '../pages/MyFavoritePage/MyFavoritePage';
import MyCartPage from '../pages/MyCartPage/MyCartPage';

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
      {
        path: '/product/:id',
        element: <ProductDetailsPage />,
        loader: ({ params }) =>
          fetch(`http://localhost:3000/products/${params.id}`),
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/sign-up',
        element: <SignUpPage />,
      },
      {
        path: '/my-favorite',
        element: <MyFavoritePage />,
      },
      {
        path: '/my-carts',
        element: <MyCartPage />,
      },
    ],
  },
]);

export default router;
