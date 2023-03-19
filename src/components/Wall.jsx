import React, { useEffect, useState } from "react";
import { useWindowSize } from "@react-hook/window-size";
import Confetti from "react-confetti";

import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import Zoom from "@mui/material/Zoom";

import Card from "./Card";
import { LineAxisOutlined } from "@mui/icons-material";

import axios from "axios";

const colours = [
  "#C9EEFF",
  "#F1DEC9",
  "#FFACAC",
  "#ECF2FF",
  "#F9F54B",
  "#C1AEFC",
  "#F8CBA6",
];

function Wall() {
  const [isExpanded, setExpanded] = useState(false);

  
  const [post, setPost] = useState({
    content: "",
    name: "",
  });
  const { width, height } = useWindowSize();
  const [data, setData] = useState([]);
  const [startConfetti, setConfetti] = useState(false);
  const [finalCard,setFinalCard]=useState(false);
  var highlightCard;
  function handleChange(event) {
    const { value, name } = event.target;

    
    setPost((prevNotes) => {
      return { ...prevNotes, [name]: value };
    });
  }

  function submitPost(event) {
    console.log(post);
    console.log(data);
    if(post.name===""){
      post.name = "Anonymous User"
    }
    event.preventDefault();

    setExpanded(false);
    submitMemory();
  }

  // function animatePress(){
  //  var lastCard = [...document.querySelectorAll(".cardWrapper")].pop();
   
  //  setFinalCard(true);
  // //  lastCard.classList.add(".cardWrapper")
   

  // }
  // animatePress();
  async function getAllMemories() {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.get(
        "https://starfish-app-uva3q.ondigitalocean.app/nbMemories/post",
        config
      );
      console.log(res.data);
      setData(res.data.results);
    } catch (err) {
      console.log("Error:", err);
    }
  }
  useEffect(() => {
    getAllMemories();
  }, []);

  async function submitMemory() {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const body = JSON.stringify(post);
      console.log(body);
      await axios
        .post("https://starfish-app-uva3q.ondigitalocean.app/nbMemories/post", body, config)
        .then((res) => {
          console.log(res.data);
        });

        setData((prevPost)=>{
          return [...prevPost,post];
        })
      setPost({ content: "", name: "" });
      setConfetti(true);

      setInterval(()=>{
        setConfetti(false);
      },8000)
    } catch (err) {
      console.log("Error:", err.res.data);
    }
  }
 
  // if(data.length<=3){
  //   document.getElementsByClassName("cardSection").classList.add("miniCardSection")
  // }

  return (
    <div class={`cardSection ${data.length <= 4 && `miniCardSection`}`}>
      <h1>NavBharat's Memories Wall</h1>
      {data.map((data) => {
        return (
          <Card
            msg={data.content}
            name={data.name}
            style={{ backgroundColor: colours[Math.round(Math.random() * 5)] ,  ...highlightCard  }}
          />
        );
      })}

      { startConfetti && <Confetti width={width} height={height} />
      }
      {data.length <= 3 ? (
        <div class="shareArea">
          <h3>Oops, Seems Like it is not Shared to many !!</h3>
          <h3>Kindly Share it to your Nav Bharat School Mates !!</h3>
        </div>
      ) : null}
      <div class="inputArea">
        <form className="create-note">
          <div>
            <textarea
              name="content"
              onClick={setExpanded}
              onChange={handleChange}
              value={post.content}
              required={true}
              autoComplete="off"
              placeholder="Add Yours..."
              rows={isExpanded ? 3 : 1}
            />
            {isExpanded && (
              <Zoom in={isExpanded}>
                <input
                  name="name"
                  onChange={handleChange}
                  
                  value={post.name}
                  required={true}
                  autoComplete="off"
                  placeholder="-By (Optional)"
                />
              </Zoom>
            )}
          </div>
        </form>

        <Fab onClick={submitPost}>
          <AddIcon />
        </Fab>
      </div>
    </div>
  );
}
export default Wall;
