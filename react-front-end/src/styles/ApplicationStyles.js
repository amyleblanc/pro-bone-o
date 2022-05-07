import { makeStyles } from "@material-ui/core/styles";
const primary = "#1FB1D6";
const background = "#BBDEE7";
const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: "#FDDA5E",
    padding: theme.spacing(8, 0, 60)
  },
  icon: {
    marginRight: "20px",
    width: "15%",
  },
  buttonContainer: {
    marginTop: "40px",
    color: "white",
  },
  loginButton: {
    backgroundColor: primary,
    color: "white",
    '&:hover': {
      background: background,
      color: "black",
    },
  },
  registerButton: {
    outlineColor: primary,
    '&:hover': {
      background: background,
    },
  },
  cardGrid: {
    padding: "20px 0",
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%" // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
}));

export default useStyles;