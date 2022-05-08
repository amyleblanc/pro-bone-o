import { makeStyles } from "@material-ui/core/styles";
const primary = "#1FB1D6";
const background = "#BBDEE7";
const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: primary,
  },
  logo: {
    marginRight: "20px",
    paddingTop: "10px",
    paddingBottom: "10px",
    width: "150px",
    display: { 
      xs: 'none', md: 'flex' 
    }, 
    mr: 1,
  },
  responsiveLogo: {
    marginRight: "20px",
    paddingTop: "10px",
    paddingBottom: "10px",
    width: "150px",
    display: { 
      xs: 'flex', md: 'none' 
    }, 
    mr: 1,
  },
}));

export default useStyles;