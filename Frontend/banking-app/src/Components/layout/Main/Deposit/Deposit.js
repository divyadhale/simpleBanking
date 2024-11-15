import { useEffect } from 'react';
import styled from 'styled-components';

import NavBar1 from '../../../../common/Navbar1';
import './Deposit.css';
import ContentMain from './ContentMain/ContentMain';
import RegulatoryFooter from '../../../../common/RegulatoryFooter';
import NavBar2 from '../../../../common/Navbar2';
import SideMenu from '../../../Dashboard/SideMenu';

const DepositContainer = styled.div`
  display: flex;
  margin-top: 8em;
`

export default function Deposit() {

  useEffect(() => {
    // Commented for validation
    // if(localStorage.getItem('accountNumber') == null){
    //     navigate('/*');
    // }
  })

  return (
    <>
      <div style={{ "position": "fixed", "top": "0", "zIndex": "3" }}>
        <NavBar1 />
        <NavBar2 />
      </div>
      <DepositContainer>
        <SideMenu />
        <div className='main-content'>
          {/* <ContentTop /> */}
          <ContentMain />
        </div>
      </DepositContainer>
      <RegulatoryFooter />
    </>
  )
}