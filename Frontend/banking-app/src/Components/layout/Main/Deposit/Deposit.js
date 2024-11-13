import Sidebar from '../Sidebar/Sidebar';
import './Deposit.css';
import ContentTop from './ContentTop/ContentTop';
import ContentMain from './ContentMain/ContentMain';


import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

export default function Deposit(){
    const navigate = useNavigate();

    useEffect(()=>{
        // Commented for validation
        // if(localStorage.getItem('accountNumber') == null){
        //     navigate('/*');
        // }
    })
    return(
        <>
            <div className='app'>
                {/* <Sidebar/> */}
                <div className='main-content'>
                    <ContentTop/>
                    <ContentMain/>
                </div>
            </div>
        </>
    )
}