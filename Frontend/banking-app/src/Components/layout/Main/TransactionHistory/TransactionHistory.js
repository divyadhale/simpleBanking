import styled from 'styled-components';
import RegulatoryFooter from '../../../../common/RegulatoryFooter';
import NavBar2 from '../../../../common/Navbar2';
import Transactions from '../../../Dashboard/TransactionList';
import SideMenu from '../../../Dashboard/SideMenu';
import './TransactionHistory.css'

const TransactionContainer = styled.div`
 display: flex;
 margin-bottom: 10em;
`
export default function Transaction() {

  return (
    
    <div style={{"top": "0" }} className='Transaction-History'>
      <div style={{ background: "#fff" }}>
      <NavBar2 />
    </div>
      <TransactionContainer>
        <SideMenu />
        <div style={{"width": "100%", "flex": "1"}}>
          <Transactions/>
        </div>
      </TransactionContainer>
      <RegulatoryFooter />
      </div>
    
  )
}