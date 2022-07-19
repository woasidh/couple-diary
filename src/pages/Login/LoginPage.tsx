import React, {ReactElement, useEffect} from 'react';
import './index.scss';
import LoginBox from './LoginBox/LoginBox';
import ImgBackground from './ImgBackground/ImgBackground';
import axios from 'axios';

const LoginPage = (): ReactElement => {

  useEffect(() => {
    axios.get('http://localhost:5000/api/users/testHTTPStatusCode').then(res => {
      console.log('abc');
    });
  })

  return (
      <div className = 'login_page'>
        <ImgBackground/>
        <LoginBox/>
      </div>
  );
};

export default LoginPage;
