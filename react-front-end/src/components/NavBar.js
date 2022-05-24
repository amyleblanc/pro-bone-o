import * as React from "react";
import { Link } from "react-router-dom";
import userState from "./atoms";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Greeting from "./Greeting/Greeting";
import { useMediaQuery } from 'react-responsive';
import { useRecoilState } from 'recoil';
import { useNavigate } from "react-router-dom";

const axios = require("axios").default;

const ResponsiveAppBar = () => {
  const [user, setUser] = useRecoilState(userState);
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleLogout = ()=> {
    setUser('')
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const Conditional = () => {
    const isMobile = useMediaQuery({ query: `(min-width: 900px)` });
    if (isMobile){
      return(
        <>
        <Greeting />
        </>
      )
    }
  }

  const names = [
    { name: "Rhys Wood", id: 2 },
    { name: "Amy McCarthy", id: 1 },
    { name: "Bryson Best", id: 3 },
  ];
  const navigate = useNavigate();

  const handleSubmit = (event, id) => {
    event.preventDefault();
    const getUser = async (id) => {
      const res = await axios.get(`${process.env.REACT_APP_host}/login/${id}`);
      setUser(res.data);
    };
    getUser(id);
    
        setTimeout(() => {
          navigate("/myaccount");
        }, 500);
  };

  const HamburgerMenu = () => {
    if(!user){
      return (
        <>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" }, flexDirection: "row-reverse" }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
              sx={{paddingTop: "35px"}}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
                <Link style={{ textDecoration: "none"}} to={'/listing'}>
                  <MenuItem key={"Browse Listings"} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">
                    Browse Listings
                    </Typography>
                  </MenuItem>
                </Link>
                {names.map((name) => (
                  <MenuItem
                    style={{ textDecoration: "none", color:"blue" }}
                    key={name.name}
                    value={name.name}
                    onClick={(event) => handleSubmit(event, name.id)}
                  >
                    {name.name}
                  </MenuItem>
                ))}
                <Link style={{ textDecoration: "none"}} to={'/registerUser'}>
                  <MenuItem key={"Register"} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">
                    Register
                    </Typography>
                  </MenuItem>
                </Link>
            </Menu>
          </Box>
        </>
      )
    } else {
      return(
        <>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" }, flexDirection: "row-reverse" }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
              sx={{paddingTop: "35px"}}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
                <Link style={{ textDecoration: "none" }} to={'/listing'}>
                  <MenuItem key={"Browse Listings"} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">
                    Browse Listings
                    </Typography>
                  </MenuItem>
                </Link>
                <Link
                  style={{ textDecoration: "none" }}
                  to={`/myaccount`}
                >
                  <MenuItem key={"My Account"} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{"My Account"}</Typography>
                  </MenuItem>
                </Link>
                <Link
                  style={{ textDecoration: "none" }}
                  to={`/logout`}
                >
                  <MenuItem key={"Logout"} onClick={() => { handleCloseNavMenu(); handleLogout();}}>
                    <Typography textAlign="center">{"Logout"}</Typography>
                  </MenuItem>
                </Link>
            </Menu>
          </Box>
        </>
      )
    }
  }

  return (
    <AppBar position="static" style={{ background: '#ffde5a' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link style={{ textDecoration: "none", padding: "10px" }} to={"/"}>
            <Typography
              noWrap
              component="a"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                height: "3em",
              }}
            >
              <img src="/images/pro-bone-o_logo.png" alt="logo" />
            </Typography>
          </Link>
          <Box sx={{display: "flex", flexDirection: "row"}}>
            <HamburgerMenu />
            <Box sx={{ display: { xs: "flex", md: "none" }, paddingLeft: "85px", width: "300px", alignContent: "center" }}>
              <Typography
                variant="h5"
                noWrap
                component="a"
                href="/"
                align={"center"}
                sx={{
                  mr: 2,
                  display: { xs: "flex", md: "none" },
                  textDecoration: "none",
                  height: "3.3em",
                }}
              >
                  <img src="/images/pro-bone-o_logo.png" alt="logo" />
              </Typography>
            </Box>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Link style={{ textDecoration: "none" }} to={'/listing'}>
              <Button
                key={"Browse Listings"}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "black", display: "block" }}
              >
                {"Browse Listings"}
              </Button>
            </Link>
          </Box>
          <Conditional />
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
