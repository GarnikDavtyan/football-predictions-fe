import React from 'react'
import logo from  '../../../images/logoBalls/logo.png';
import './index.css';
import { useNavigate } from 'react-router-dom';
import {paths} from '../../../../constants'


export default function HeaderLogo() {
    const navigate = useNavigate();
    
    return (
        <div onClick={()=>navigate(paths.home)} 
            className='header-logo'
        >
            PREDICT
            <img 
                style={{margin: "0px 2px"}} 
                src={logo} 
                alt='O' 
                height="42" 
                width="42"
            />
            R
        </div>
    );
}
