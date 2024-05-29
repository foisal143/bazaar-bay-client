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
import ManageProfile from '../pages/ManageProfile/ManageProfile';
import UserDashBoard from '../Layouts/UserDashBoard';
import EditProfile from '../pages/UserDashboard/EditProfile/EditProfile';
import EditAddress from '../pages/UserDashboard/EditAddress/EditAddress';
import BuyProductPage from '../pages/BuyProductPage/BuyProductPage';
import PaymentPage from '../pages/PaymentPage/PaymentPage';
import OrdersPage from '../pages/UserDashboard/OrdersPage/OrdersPage';
import ManageUsers from '../pages/AdminDashboardsPages/ManageUsers/ManageUsers';

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
      {
        path: '/buy-products/:id',
        element: (
          <PrivateRoute>
            <BuyProductPage />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:3000/products/${params.id}`),
      },
      {
        path: '/payment/:price',
        element: <PaymentPage />,
      },
    ],
  },
  {
    path: '/dashboard',
    element: (
      <PrivateRoute>
        <UserDashBoard />
      </PrivateRoute>
    ),
    children: [
      {
        path: '/dashboard/profile',
        element: (
          <PrivateRoute>
            <ManageProfile />
          </PrivateRoute>
        ),
      },
      {
        path: '/dashboard/personal/edit',
        element: (
          <PrivateRoute>
            <EditProfile />
          </PrivateRoute>
        ),
      },
      {
        path: '/dashboard/address/edit',
        element: (
          <PrivateRoute>
            <EditAddress />
          </PrivateRoute>
        ),
      },
      {
        path: '/dashboard/my-favorite',
        element: (
          <PrivateRoute>
            <MyFavoritePage />
          </PrivateRoute>
        ),
      },
      {
        path: '/dashboard/my-orders',
        element: (
          <PrivateRoute>
            <OrdersPage />
          </PrivateRoute>
        ),
      },
      // admin routes
      {
        path: '/dashboard/manage-users',
        element: <ManageUsers />,
      },
    ],
  },
]);

export default router;
