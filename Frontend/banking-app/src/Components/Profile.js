import React from 'react';
import styled from 'styled-components';

const ProfileContainer = styled.div`
   flex: 1;
 margin: 20px;
 background: white;
 padding: 2%;
 box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
`;

const Profile = () => {
  return (
    <>
      <ProfileContainer>
        your profile content here!!!
      </ProfileContainer>
    </>

  )

}

export default Profile;