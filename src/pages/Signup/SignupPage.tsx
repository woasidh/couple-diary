import React, { ReactElement } from 'react';
import ImgBackground from '../Login/ImgBackground/ImgBackground';
import './SignupPage.scss';
import SignupBox from './SignupBox/SignupBox';

const Signup = (): ReactElement => (
  <div className = 'signup_page'>
    <ImgBackground/>
    <SignupBox/>
  </div>
);

export default Signup;
