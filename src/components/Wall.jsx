import React, { useEffect, useState } from "react";
import { useWindowSize } from "@react-hook/window-size";
import ConfettiExplosion from 'react-confetti-explosion';

import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import Zoom from "@mui/material/Zoom";
import InfiniteScroll from 'react-infinite-scroller';
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import ShareBtn from "./ShareBtn";
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

// const fonts =[
//   "'Amatic SC', cursive",
//   "'Cookie', cursive",
//   "'Nanum Brush Script', cursive",
//   "'Pangolin', cursive",
//   "'Rancho', cursive",
//   "'Sacramento', cursive",
// ];

function Wall() {
  const [isExpanded, setExpanded] = useState(false);

  const [post, setPost] = useState({
    content: "",
    name: "",
  });
  const { width, height } = useWindowSize();
  const [data, setData] = useState([]);
  const [startConfetti, setConfetti] = useState(false);
  const [backdrop,setBackDrop]=useState(true);
  const [hasMore,setHasMore]=useState(true);
  const [loading, setLoading] = useState(true);
  const [pageNo,setPageNo]=useState(1);

  
  function handleChange(event) {
    const { value, name } = event.target;

    setPost((prevNotes) => {
      return { ...prevNotes, [name]: value };
    });
  }

  function submitPost(event) {
    console.log(post);
    console.log(data);
    if (post.name === "") {
      post.name = "Anonymous User";
    }
    event.preventDefault();

    setExpanded(false);
    
    submitMemory();
  }


    useEffect( ()=>{
       hasMore &&  setLoading(true);
        async function getAllMemories() {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        try {
          const res = await axios.get(
            `https://starfish-app-uva3q.ondigitalocean.app/nbMemories/post/${pageNo}`,
            // `http://localhost:3001/nbMemories/post/${pageNo}`,
            
            config
          );
          
          setBackDrop(false);
          setLoading(false);
          setData((prevData)=>{
           return [...prevData,...res.data.results] 
          });
          if(res.data.results.length===0){
            setHasMore(false);
          }
        } catch (err) {
          console.log("Error:", err);
        }
        // setLoading(false);
       }

       hasMore &&  getAllMemories();
    },[pageNo])
    
 

  // Infinite Scrolling

 
    useEffect(()=>{
     
      window.addEventListener("scroll",handleScroll);
      return ()=> window.removeEventListener("scroll",handleScroll);
     
    },[])
  
  
  
  const handleScroll = ()=>{
    if(window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight){
      setLoading(false);
      setPageNo((prev)=> prev+1);
    }
  }

  



  async function submitMemory() {
    setConfetti(true);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const body = JSON.stringify(post);
      console.log(body);
      await axios
        .post(
          "https://starfish-app-uva3q.ondigitalocean.app/nbMemories/post",
          // "http://localhost:3001/nbMemories/post",
          body,
          config
        )
        .then((res) => {
          console.log(res.data);
        });

      setData((prevPost) => {
        return [...prevPost, post];
      });
      setPost({ content: "", name: "" });
      
      

      setInterval(() => {
        setConfetti(false);
      }, 8000);
    } catch (err) {
      console.log("Error:", err.res.data);
    }
  }


  return (
    <div class={`cardSection ${data.length < 3 && `miniCardSection`}`}>
      <h1 class="title">NavBharat's Memories Wall</h1>

   
      { data.map((data) => {
       
        return (
          <Card
            msg={data.content}
            name={data.name}
            style={{
              
              backgroundColor: colours[Math.round(Math.random() * 6)],
              // fontFamily:fonts[Math.round(Math.random() * 5)],
            }}
          />
        );
      })} 
      <div  className='loader'>
      {loading &&  <CircularProgress />  }
      { hasMore ? null : data.length>3 ? <p>The End !</p> : null}
      </div>
     
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={backdrop}
        onClick={() => {
          setLoading(false);
        }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

        <div class="confetti">
        {startConfetti && <ConfettiExplosion style={{height:"100%",zIndex:200}} duration={7000} /> }
        </div>

      
      {/* {startConfetti && <ConfettiExplosion style={{height:"100%"}}  /> } */}
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
      <div style={{display:"flex",justifyContent:"center"}}>
      <ShareBtn />
      </div>
      
    </div>
  );
}
export default Wall;
