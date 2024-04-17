import { useState } from "react";
import { createUseStyles } from "react-jss";
import { useWebcamCapture } from "./useWebcamCapture";
import logo from "./slap.png";
import { Link, Switch, Route, Redirect } from "react-router-dom";

const useStyles = createUseStyles((theme) => ({
  "@global body": {
    background: theme.palette.background,
    color: theme.palette.text,
    fontFamily: "sans-serif",
  },

  app: {
    maxWidth: "800px",
    minHeight: "600px",
    margin: "auto",
    padding: "20px",
    background: theme.palette.primary,
    fontFamily: "'Libre Franklin', sans-serif",
    "& a": {
      color: theme.palette.text,
    },
  },
  header: {
  },
  nav: {
    display: "flex",
    justifyContent: "flex-end",
    flexWrap: "nowrap",
    padding: 0,
    margin: 0,
  },
  navList: {
    display:"flex",
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
  main: {},
  camera: {
    background: theme.palette.secondary,

    "& canvas": {
      width: "100%",
      height: "auto",
    },
    "& video": {
      display: "none",
    },
  },
  stickers: {
    "& img": {
      height: "4rem",
    },
  },
  gallery: {
    "& img": {
      height: "16rem",
    },
  },
  picture: {
    background: "black",
    padding: 4,
    position: "relative",
    display: "inline-block",
    "& h3": {
      padding: 8,
      textAlign: "center",
      width: "100%",
    },
  },
}));

const stickers = [logo].map((url) => {
  const img = document.createElement("img");
  img.src = url;
  return { img, url };
});

function App(props) {
  // css classes from JSS hook
  const classes = useStyles(props);
  // currently active sticker
  const [sticker, setSticker] = useState();
  // title for the picture that will be captured
  const [title, setTitle] = useState("SLAPPE!");

  // webcam behavior hook
  const [
    handleVideoRef, // callback function to set ref for invisible video element
    handleCanvasRef, // callback function to set ref for main canvas element
    handleCapture, // callback function to trigger taking the picture
    picture, // latest captured picture data object
  ] = useWebcamCapture(sticker?.img, title);

  return (
    <div className={classes.app}>
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
        <Route exact path="/" >
          <main className={classes.main}>
            <section>
              <h1>SlapSticker</h1>
              <p>
                Have you ever said something so dumb, you just wanted to slap
                yourself? Well now you can!
              </p>
            </section>
            <section className={classes.gallery}>
              Step one: Give it a name
              <input
                type="text"
                value={title}
                onChange={(ev) => setTitle(ev.target.value)}
              />
            </section>
            <section className={classes.stickers}>
              Step 2: select your sticker...
              <button onClick={() => setSticker(stickers[0])}>
                <img src={stickers[0].url} />
              </button>
            </section>
            <section className={classes.camera}>
              Step three: Slap your self!
              <video ref={handleVideoRef} />
              <canvas
                ref={handleCanvasRef}
                width={2}
                height={2}
                onClick={handleCapture}
              />
            </section>
            <section className={classes.gallery}>
              Step 4: Cherish this moment forever
              {picture && (
                <div className={classes.picture}>
                  <img src={picture.dataUri} />
                  <h3>{picture.title}</h3>
                </div>
              )}
            </section>
          </main>
        </Route>
        <Route path="/about">
       <div>about page</div>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
