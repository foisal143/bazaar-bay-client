import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../AtuhProvaider/AuthProvaider';
import { useNavigate } from 'react-router-dom';

const axiosSecuire = axios.create({
  baseURL: 'http://localhost:3000',
});

const useAxiosSecuire = () => {
  const { logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const token = localStorage.getItem('bazzar-bay-ac-token');
  axiosSecuire.interceptors.request.use(
    config => {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );

  axiosSecuire.interceptors.response.use(
    response => {
      return response;
    },
    error => {
      console.log(error);
      if (
        (error.response && error.response.status === 403) ||
        error.response.status === 401
      ) {
        logOut().then();
        navigate('/login');
      }
    }
  );
  return axiosSecuire;
};

export default useAxiosSecuire;
