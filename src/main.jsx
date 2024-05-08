import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import router from './routes/routes.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import store from './Redux/store/store.js';
import AuthProvaider from './AtuhProvaider/AuthProvaider.jsx';
const queryclient = new QueryClient();
import { Toaster } from 'react-hot-toast';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthProvaider>
        <QueryClientProvider client={queryclient}>
          <RouterProvider router={router}></RouterProvider>
          <Toaster />
        </QueryClientProvider>
      </AuthProvaider>
    </Provider>
  </React.StrictMode>
);
