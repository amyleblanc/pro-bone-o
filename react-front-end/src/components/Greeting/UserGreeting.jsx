import React from 'react';
import Box from "@mui/material/Box";
import { useRecoilValue } from 'recoil';
import userState from '../atoms';

function UserGreeting() {
    const user = useRecoilValue(userState);
    return (
        <Box sx={{mr: 2}}>
            Welcome, {user.first_name}!
        </Box>
    );
}

export default UserGreeting;