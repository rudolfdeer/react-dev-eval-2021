import { createUseStyles } from "react-jss";
import { Link, Switch, Route } from "react-router-dom";
import AboutPage from "./AboutPage";
import HomePage from "./HomePage";

const useStyles = createUseStyles((theme) => ({
  "@global body": {
    background: theme.palette.background,
    color: theme.palette.text,
    fontFamily: "sans-serif",
  },
  app: {
    minHeight: "100vh",
    background: theme.palette.primary,
    fontFamily: "'Libre Franklin', sans-serif",
    "& a": {
      color: theme.palette.text,
    },
  },
  wrapper: {
    margin: "auto",
    maxWidth: "800px",
    padding: "20px",
  },
  header: {
    marginBottom: 30,
  },
  nav: {
    display: "flex",
    justifyContent: "flex-end",
    flexWrap: "nowrap",
    padding: 0,
    margin: 0,
  },
  navList: {
    display: "flex",
    listStyle: "none",
    margin: 0,
  },
  navListItem: {
    "& a": {
      textDecoration: "none",
    },
    "& :hover": {
      cursor: "pointer",
      textDecoration: "underline",
    },
    "& :first-child": {
      marginRight: 10,
    },
  },
}));

function App(props) {
  const classes = useStyles(props);

  return (
    <div className={classes.app}>
      <div className={classes.wrapper}>
        <header className={classes.header}>
          <nav className={classes.nav}>
            <ul className={classes.navList}>
              <li className={classes.navListItem}>
                <Link to="/">Home</Link>
              </li>
              <li className={classes.navListItem}>
                <Link to="/about">About</Link>
              </li>
            </ul>
          </nav>
        </header>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/about">
            <AboutPage />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
