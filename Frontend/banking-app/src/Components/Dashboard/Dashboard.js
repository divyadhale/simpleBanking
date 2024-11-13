import React from 'react';
import styled from 'styled-components';
import SideMenu from './SideMenu';
import Overview from './Overview';
import Transactions from './Transaction';
import QuickTransfers from './QuickTransfers';
import Cards from './Cards';

const DashboardContainer = styled.div`
  display: flex;
`;

const DashboardContent = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 20px;
  background-color: #f4f5f7;
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const RightSidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

function Dashboard() {
    return (
        <DashboardContainer>
            {/* <SideMenu /> */}
            <DashboardContent>
                <MainContent>
                    <Overview />
                    <Transactions />
                </MainContent>
                <RightSidebar>
                    {/* <QuickTransfers /> */}
                    <Cards />
                </RightSidebar>
            </DashboardContent>
        </DashboardContainer>
    );
}

export default Dashboard;
