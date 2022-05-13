import React from 'react';
import GuestGreeting from './GuestGreeting';
import UserGreeting from './UserGreeting';
import { useRecoilValue } from 'recoil';
import userState from '../atoms';

function Greeting(props) {
  const user = useRecoilValue(userState);
  if (user.id) {
    return <UserGreeting />;
  }
  return <GuestGreeting />;
}

export default Greeting;