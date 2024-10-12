// src/hooks/useAxiosInterceptor.js

import { useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { myCookie } from '../utils/myCookie';

const useAxiosInterceptor = () => {
  const navigate = useNavigate();
  const { search } = useLocation();

  useEffect(() => {
    const responseInterceptor = axios.interceptors.response.use(
      response => response,
      error => {
        if (error.response && error.response.status === 401) {
          myCookie.clear("access_token"); 
          navigate(`/login${search}`);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, [navigate]);
};

export default useAxiosInterceptor;
