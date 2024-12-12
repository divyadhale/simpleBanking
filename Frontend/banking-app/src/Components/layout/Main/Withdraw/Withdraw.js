import Sidebar from '../Sidebar/Sidebar';
import ContentTop from './ContentTop/ContentTop';
import ContentMain from './ContentMain/ContentMain';

import './Withdraw.css';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

export default function Withdraw(){const navigate = useNavigate();

    useEffect(()=>{
        if(atob(localStorage?.getItem('token')) == null){
            navigate('/*');
        }
    })
    return(
        <div style={{ "top": "0" }}>
            <div className='app'>
                <Sidebar/>
                <div className='main-content'>
                    <ContentTop/>
                    <ContentMain/>
                </div>
            </div>
        </div>
    )
}