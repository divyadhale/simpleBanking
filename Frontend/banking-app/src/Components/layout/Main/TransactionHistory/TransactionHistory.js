import styled from 'styled-components';
import RegulatoryFooter from '../../../../common/RegulatoryFooter';
import NavBar2 from '../../../../common/Navbar2';
import Transactions from '../../../Dashboard/TransactionList';
import SideMenu from '../../../Dashboard/SideMenu';

const TransactionContainer = styled.div`
 display: flex;
 margin-bottom: 10em;
`
export default function Transaction() {

  return (
    
    <div style={{"top": "0" }}>
      <div style={{ background: "#fff" }}>
      <NavBar2 />
    </div>
      <TransactionContainer>
        <SideMenu />
        <Transactions/>
      </TransactionContainer>
      <RegulatoryFooter />
      </div>
    
  )
}