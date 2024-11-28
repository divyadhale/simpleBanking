import React,{useState, useEffect} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import './Profile.css';
import NavBar2 from '../common/Navbar2';
import SideMenu from '../Components/Dashboard/SideMenu';
import RegulatoryFooter from '../common/RegulatoryFooter';

const ProfileContainer = styled.div`
  display: flex;
  margin-top: 5.8em;
  margin-bottom: 10em;
`

const Profile = () => {
  const [name, setName] = useState(0);
  const [customerId, setCustomerId] = useState(0);
  const [email, setEmail] = useState(0);
  const [phone, setPhone] = useState(0);
  const [address, setAddress] = useState(0);
  const [addhar, setAddhar] = useState(0);
  const [pan, setPan] = useState(0);

  
  useEffect(() => {
    const token = localStorage.getItem('token');
    const customerId = token ? atob(token) : undefined;
    if(customerId)
      setCustomerId(JSON.parse(customerId));
    async function fetchProfile() {
      try {
        await axios.get(`http://localhost:8080/api/simple/banking/profile?customerId=${JSON.parse(customerId)}`).then(res => {
          setName(res.data.firstName + " " + res.data.lastName)
          setEmail(res.data.emailId)
          setPhone(res.data.contact)
          setAddress(res.data.address)
          setAddhar(res.data.aadharNumber)
          setPan(res.data.panNumber)
        })
      } catch (err) {
        console.log('Error fetching balance', err);
      }
    }
    fetchProfile();
  }, [])

  return (
    <>
      <div style={{ "position": "fixed", "top": "0", "zIndex": "3" }}>
        <NavBar2 />
      </div>
      <ProfileContainer>
        <SideMenu/>
        <div className='main-contents'>
          <div className='profile-field'>
            <div className='profile-field-1'>
              <div>Customer ID</div>
              <div>Name</div>
              <div>Email Id</div>
              <div>Mobile no</div>
              <div>Address</div>
              <div>Pan no</div>
              <div>Aadhaar no</div>
            </div>

            <div className='profile-field-2'>
              <div>{customerId}</div>
              <div>{name}</div>
              <div>{email}</div>
              <div>{phone}</div>
              <div>{address}</div>
              <div>{pan}</div>
              <div>{addhar}</div>
            </div>
          </div>
        </div>
      </ProfileContainer>
      <RegulatoryFooter />
    </>

  )

}

export default Profile;