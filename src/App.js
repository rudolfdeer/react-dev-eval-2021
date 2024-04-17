import { useState } from "react";
import { createUseStyles } from "react-jss";
import { useWebcamCapture } from "./useWebcamCapture";
import img1 from "./assets/slap.png";
import img2 from "./assets/clown.png";
import img3 from "./assets/hand.png";
import img4 from "./assets/hand 2.png";
import { Link, Switch, Route } from "react-router-dom";

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
  main: {},
  intro: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 80,
    color: "#2266dd",
    padding: [20, 50],
    background: "#fff",
    boxShadow: [0, 0, 10, "rgba(0, 0, 0, 0.1)"],
    borderRadius: 30,
  },
  title: {
    margin: [0, 0, 15],
    fontSize: 50,
    lineHeight: "50px",
    fontWeight: 800,
  },
  description: {
    margin: 0,
    fontSize: 18,
  },
  sectionTitle: {
    marginBottom: 15,
  },
  section: {
    marginBottom: 30,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  nameInput: {
    width: 300,
    height: 20,
    border: "none",
    borderRadius: 100,
    padding: [8, 10],
    fontSize: 12,
  },
  stikers: {
    display: "flex",
    justifyContent: "space-between",
  },
  stickerButton: {
    marginRight: 10,
    "&:last-child": {
      marginRight: 0,
    },
  },
  stickerImage: {
    height: "4rem",
  },
  video: { display: "none" },
  canvas: { width: "100%", height: "auto" },
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
    "& img": {
      height: "16rem",
    },
  },
}));

const stickers = [img1, img2, img3, img4].map((url) => {
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
            <main className={classes.main}>
              <section className={classes.intro}>
                <h1 className={classes.title}>SlapSticker</h1>
                <p className={classes.description}>
                  Have you ever said something so dumb, you just wanted to slap
                  yourself? Well now you can! 👋
                </p>
              </section>
              <section className={classes.section}>
                <span className={classes.sectionTitle}>
                  Step 1: Give it a name
                </span>
                <input
                  className={classes.nameInput}
                  type="text"
                  value={title}
                  onChange={(ev) => setTitle(ev.target.value)}
                />
              </section>
              <section className={classes.section}>
                <span className={classes.sectionTitle}>
                  Step 2: Select your sticker
                </span>
                <div className={classes.stickers}>
                  {stickers.map((el) => (
                    <button
                      className={classes.stickerButton}
                      onClick={() => setSticker(el)}
                      key={el.url}
                    >
                      <img className={classes.stickerImage} src={el.url} />
                    </button>
                  ))}
                </div>
              </section>
              <section className={classes.section}>
                <span className={classes.sectionTitle}>
                  Step 3: Slap yourself!
                </span>
                <video ref={handleVideoRef} className={classes.video} />
                <canvas
                  ref={handleCanvasRef}
                  width={2}
                  height={2}
                  onClick={handleCapture}
                  className={classes.canvas}
                />
              </section>
              <section className={classes.section}>
                <span className={classes.sectionTitle}>
                  Step 4: Cherish this moment forever
                </span>
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
    </div>
  );
}

export default App;
