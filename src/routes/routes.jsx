import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../Layouts/MainLayout';
import Home from '../pages/Home/Home/Home';
import CategoryPage from '../pages/CategoryPage/CategoryPage/CategoryPage';
import ProductDetailsPage from '../pages/ProductDetailsPage/ProductDetailsPage/ProductDetailsPage';
import Login from '../pages/Login/Login';
import SignUpPage from '../pages/SignUpPage/SignUpPage';
import MyFavoritePage from '../pages/MyFavoritePage/MyFavoritePage';
import MyCartPage from '../pages/MyCartPage/MyCartPage';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import SearchProductsPage from '../pages/SearchProductsPage/SearchProductsPage';

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
        element: (
          <PrivateRoute>
            <MyFavoritePage />
          </PrivateRoute>
        ),
      },
      {
        path: '/my-carts',
        element: (
          <PrivateRoute>
            <MyCartPage />
          </PrivateRoute>
        ),
      },
      {
        path: '/search-products/:name',
        element: <SearchProductsPage />,
        loader: ({ params }) =>
          fetch(`http://localhost:3000/search-products/${params.name}`),
      },
    ],
  },
]);

export default router;
