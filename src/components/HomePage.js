import { useEffect, useState } from "react";
import { createUseStyles } from "react-jss";
import { useWebcamCapture } from "../useWebcamCapture";
import img1 from "../assets/slap.png";
import img2 from "../assets/clown.png";
import img3 from "../assets/hand.png";
import img4 from "../assets/hand 2.png";
import download from "../assets/download.png";

const useStyles = createUseStyles(() => ({
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
    background: "white",
    borderRadius: 30,
    position: "relative",
    "& h3": {
      padding: 8,
      textAlign: "center",
      width: "100%",
      color: "black",
      margin: 0,
    },
    "& img": {
      maxWidth: "100%",
      borderRadius: [30, 30, 0, 0],
    },

    "& a": {
      position: "relative",
    },
  },
  gallery: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    columnGap: 10,
    rowGap: 15,
  },
  overlay: {
    position: "absolute",
    bottom: 0,
    borderRadius: 30,
    background: "rgba(0, 0, 0, 0.5)",
    color: "#f1f1f1",
    width: "100%",
    height: "100%",
    opacity: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    "&:hover": {
      opacity: 1,
    },
    " & a": {
      position: "absolute",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    "& img": {
      width: 30,
      height: 30,
      "&:hover": {
        cursor: "pointer",
        transform: "scale(1.1)",
      },
    },
  },
}));

const stickers = [img1, img2, img3, img4].map((url) => {
  const img = document.createElement("img");
  img.src = url;
  return { img, url };
});

function HomePage(props) {
  const classes = useStyles(props);
  const [sticker, setSticker] = useState();
  const [title, setTitle] = useState("SLAPPE!");
  const [pictures, setPictures] = useState([]);
  const [
    handleVideoRef, // callback function to set ref for invisible video element
    handleCanvasRef, // callback function to set ref for main canvas element
    handleCapture, // callback function to trigger taking the picture
    picture, // latest captured picture data object
  ] = useWebcamCapture(sticker?.img, title);

  useEffect(() => {
    if (picture) setPictures([picture, ...pictures]);
  }, [picture]);

  return (
    <main className={classes.main}>
      <section className={classes.intro}>
        <h1 className={classes.title}>SlapSticker</h1>
        <p className={classes.description}>
          Have you ever said something so dumb, you just wanted to slap
          yourself? Well now you can! 👋
        </p>
      </section>
      <section className={classes.section}>
        <span className={classes.sectionTitle}>Step 1: Give it a name</span>
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
        <span className={classes.sectionTitle}>Step 3: Slap yourself!</span>
        <video ref={handleVideoRef} className={classes.video} />
        <canvas
          ref={handleCanvasRef}
          width={2}
          height={2}
          onClick={() => {
            handleCapture();
            setSticker(null);
          }}
          className={classes.canvas}
        />
      </section>
      {picture && (
        <section className={classes.section}>
          <span className={classes.sectionTitle}>
            Step 4: Cherish this moment forever
          </span>
          <div className={classes.gallery}>
            {pictures.slice(0, 4).map((pic) => (
              <div className={classes.picture} key={pic.dataUri}>
                <img src={pic.dataUri} />
                <h3>{pic.title}</h3>
                <div className={classes.overlay}>
                  <a href={pic.dataUri} download>
                    <img
                      src={download}
                      classname={classes.downloadIcon}
                      title="Download"
                    />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

export default HomePage;
