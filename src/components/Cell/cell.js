import React from "react";
import "./cell.css";

export function Cell(props) {
  let type;
  switch (props.cellType) {
    case 1:
      type = "cell-white";
      break;
    case -1:
      type = "cell-black";
      break;
    case 0:
      type = "cell-empty";
      break;
    default:
      type = "cell";
      break;
  }

  return <button className={type} onClick={props.onClick}></button>;
}
