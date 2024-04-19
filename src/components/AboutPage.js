import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({});

function AboutPage(props) {
  const classes = useStyles(props);

  return <main className={classes.main}>About Page</main>;
}

export default AboutPage;
