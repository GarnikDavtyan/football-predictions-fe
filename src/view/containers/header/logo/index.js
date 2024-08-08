import React from 'react'
import logo from  '../../../images/logoBalls/logo.png';
import './index.css';
import { withRouter } from 'react-router-dom';
import {paths} from '../../../../constants'


const HeaderLogo = ({history}) => (
    <div onClick={()=>history.push(paths.home)} className='header-logo'>PREDICT<img style={{margin: "0px 2px"}} src={logo} alt='O' /* title='predictOr' */ height="42" width="42"/>R</div>
);

export default withRouter(HeaderLogo)
