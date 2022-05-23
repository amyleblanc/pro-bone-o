import React from 'react';
import Box from "@mui/material/Box";
import { useRecoilState } from 'recoil';
import { useMediaQuery } from 'react-responsive';
import userState from '../atoms';
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";



function UserGreeting() {
  const [user, setUser] = useRecoilState(userState);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
      };
    
      const handleCloseUserMenu = () => {
        setAnchorElUser(null);
      };

      const handleLogout = ()=> {
        setUser('')
      }


      const Mobile = () => {
        const isMobile = useMediaQuery({ query: `(min-width: 900px)` });
        if (isMobile){
          return(
            <>
            <Box sx={{mr: 2, color:"black"}}>
              Welcome, {user.first_name}!
            </Box>
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
          
            <Link
              style={{ textDecoration: "none" }}
              to={`/myaccount`}
            >
              <MenuItem key={"My Account"} onClick={handleCloseUserMenu}>
                <Typography textAlign="center">{"My Account"}</Typography>
              </MenuItem>
            </Link>

            <Link
            style={{ textDecoration: "none" }}
            to={`/logout`}
          >
            <MenuItem key={"Logout"} onClick={() => { handleCloseUserMenu(); handleLogout();}}>
              <Typography textAlign="center">{"Logout"}</Typography>
            </MenuItem>
          </Link>
    
        </Menu>
            </>
          )
        }
      }
      
    return (
        <>
        
        <Mobile />
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
        </Menu>
      </Box>
         
      </>
    );
}

export default UserGreeting;