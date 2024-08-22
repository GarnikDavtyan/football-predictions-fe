import React from 'react';
import { Route } from 'react-router-dom';

const CustomRoute = (props) => <div className='custom-route'><Route {...props} ></Route></div>

export default CustomRoute;
