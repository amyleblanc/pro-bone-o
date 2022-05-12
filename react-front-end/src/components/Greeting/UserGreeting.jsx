import React from 'react';
import Box from "@mui/material/Box";
import { useRecoilValue } from 'recoil';
import userState from '../atoms';
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";



function UserGreeting() {
    const user = useRecoilValue(userState);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
      };
    
      const handleCloseUserMenu = () => {
        setAnchorElUser(null);
      };
      const settings = [
        { page: "Profile", link: "profile" },
        { page: "My Listings", link: "mylistings" },
        { page: "My Bookings", link: "mybookings" },
        { page: "Logout", link: "logout" },
      ];
    return (
        <>
        
        <Box sx={{mr: 2}}>
            Welcome, {user.first_name}!
        </Box>
        <Box sx={{ flexGrow: 0 }}>
        <Tooltip title="Open settings">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar alt="Remy Sharp" src={user.photo_url} />
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ mt: "45px" }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          {settings.map((setting) => (
            <Link
              style={{ textDecoration: "none" }}
              to={`/${setting.link}`}
            >
              <MenuItem key={setting.page} onClick={handleCloseUserMenu}>
                <Typography textAlign="center">{setting.page}</Typography>
              </MenuItem>
            </Link>
          ))}
        </Menu>
      </Box>
      </>
    );
}

export default UserGreeting;