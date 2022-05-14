import React from 'react';
import Profile from './Profile';
import ProfileWall from './ProfileWall';
import { useRecoilValue } from 'recoil';
import userState from '../components/atoms';

function ProfileProtec(props) {
    const user = useRecoilValue(userState);

    if (user.id) {
      return <Profile />;
    }
    return <ProfileWall />;
  }
  
  export default ProfileProtec;