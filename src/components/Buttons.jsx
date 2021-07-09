import React from "react";
import "./Buttons.css";

const Buttons = (props) => {
  var nClass = 'button '
  nClass += props.operation ? 'operation' : '';
  nClass += props.double ? 'double' : '';
  nClass += props.triple ? 'triple' : '';
  return (
    <button onClick={_ => props.click && props.click(props.label)} className={nClass}>
      {props.label}
    </button>
  );
};

export default Buttons;
