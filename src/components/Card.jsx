import React from "react";
import Zoom from "@mui/material/Zoom";
function Card(props) {
 
  return <div className="cardWrapper" >
  <Zoom in={true}>
  <div class="cardContent" style={props.style}>
    <h2>{props.msg}</h2>
    <p>- {props.name}</p>
    </div>
    </Zoom>
  </div>

}
export default Card;