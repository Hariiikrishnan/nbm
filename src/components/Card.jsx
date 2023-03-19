import React from "react";

function Card(props) {
 
  return <div className="cardWrapper" >
  <div class="cardContent" style={props.style}>
    <h2>{props.msg}</h2>
    <p>- {props.name}</p>
    </div>
  </div>

}
export default Card;