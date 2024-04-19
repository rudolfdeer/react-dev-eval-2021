import { useState } from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles(() => ({
  toggle: {
    "-webkit-appearance": "none",
    "-moz-appearance": "none",
    appearance: "none",
    width: 62,
    height: 32,
    display: "inline-block",
    position: "relative",
    borderRadius: 50,
    overflow: "hidden",
    outline: "none",
    border: "none",
    cursor: "pointer",
    backgroundColor: "#707070",
    transition: "background-color ease 0.3s",

    "&::before": {
      content: "'on off'",
      display: "block",
      position: "absolute",
      zIndex: 2,
      width: 28,
      height: 28,
      background: "#fff",
      left: 2,
      top: 2,
      borderRadius: 50,
      font: "10px/28px Helvetica",
      textTransform: "uppercase",
      fontWeight: "bold",
      textIndent: -22,
      wordSpacing: 37,
      color: "#fff",
      textShadow: "-1px -1px rgba(0,0,0,0.15)",
      whiteSpace: "nowrap",
      boxShadow: "0 1px 2px rgba(0,0,0,0.2)",
      transition: "all cubic-bezier(0.3, 1.5, 0.7, 1) 0.3s",
    },

    "&:checked": {
      backgroundColor: "#4CD964",
    },

    "&:checked::before": {
      left: 32,
    },
  },
}));

function Toggle({ isChecked, setIsCameraOn }, ...props) {
  const classes = useStyles(props);
  const [checked, setChecked] = useState(isChecked);

  const handleChange = () => {
    setIsCameraOn(!checked);
    setChecked(!checked);
  };

  return (
    <input
      className={classes.toggle}
      type="checkbox"
      checked={checked}
      onChange={handleChange}
    />
  );
}

export default Toggle;
