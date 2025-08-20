import { useEffect, useState } from "react"
import dc from './assets/duckcake.png'
import dj from './assets/duckjuice.png'
import ds from './assets/duckSoda.png'
import jb from './assets/juicebox.png'
import lm from './assets/lemon.png'
import gb from './assets/giftbox.png'
import correct from './assets/correct.mp3'
export default function App(){

const[tries, setTries] = useState(0)
const[win,setWin] = useState(0)
const[count,setCount] = useState(0)
const[check, setCheck] = useState([])
const [pic,setPic] = useState([{
  id: 1,
  isFlipped:false,
  image: dc,
  isMatched: false
},
{
  id: 2,
  isFlipped:false,
  image: dc,
  isMatched: false
},
{
  id: 3,
  isFlipped:false,
  image: dj,
  isMatched: false
},
{
  id: 4,
  isFlipped:false,
  image: dj,
  isMatched: false
},
{
  id: 5,
  isFlipped:false,
  image: ds,
  isMatched: false
},
{
  id: 6,
  isFlipped:false,
  image: ds,
  isMatched: false
},
{
  id: 7,
  isFlipped:false,
  image: jb,
  isMatched: false
},
{
  id: 8,
  isFlipped:false,
  image: jb,
  isMatched: false
},
{
  id: 9,
  isFlipped:false,
  image: lm,
  isMatched: false
},
{
  id: 10,
  isFlipped:false,
  image: lm,
  isMatched: false
},
].sort(()=>Math.random()-0.5))





function flip(id){

  setCount(prev => prev+1)
  if(count < 2 ){
setPic(prev =>prev.map(
    data => {if(id === data.id){
      if(data.isFlipped === false){
setCheck(prev => [...prev, data.image])
      return {...data, isFlipped: true}
      }
      else{
        setCount(1)
        return data
      }
      
    } else{
      return data
    }}

  ))

  }

  else{
setPic(prev => prev.map(
    data =>  !data.isMatched? {...data, isFlipped: false} : data
  ))
setCount(0)
setCheck([])
  }
}

function swap(id){
  document.getElementById(id).style.transform = "translateY(180deg)"
}


useEffect(()=>{
if(check.length === 2){
  setTries(prev => prev+1)
  if(check[0] === check[1]){
setPic(prev => prev.map(
    data => {if(data.image === check[0] || data.image === check[0]){
      return {...data, isMatched: true}
    }else{
      return data
    }}
  ))
  
  setCount(0)
  setWin(prev => prev+1)
  setCheck([])
  var audio = new Audio(correct);
  audio.volume = 0.1
audio.play();
  }
  else if(check[0] !== check[1]){
   setTimeout(()=>{
        setCount(0)
        setCheck([])
        setPic(prev => prev.map(
          data => data.image === check[0] || data.image === check[1] ? {...data, isFlipped: false} : data
        ))
   },1000);
    
  }
}
},[count])

function reset(){
  setPic([{
  id: 1,
  isFlipped:false,
  image: dc,
  isMatched: false
},
{
  id: 2,
  isFlipped:false,
  image: dc,
  isMatched: false
},
{
  id: 3,
  isFlipped:false,
  image: dj,
  isMatched: false
},
{
  id: 4,
  isFlipped:false,
  image: dj,
  isMatched: false
},
{
  id: 5,
  isFlipped:false,
  image: ds,
  isMatched: false
},
{
  id: 6,
  isFlipped:false,
  image: ds,
  isMatched: false
},
{
  id: 7,
  isFlipped:false,
  image: jb,
  isMatched: false
},
{
  id: 8,
  isFlipped:false,
  image: jb,
  isMatched: false
},
{
  id: 9,
  isFlipped:false,
  image: lm,
  isMatched: false
},
{
  id: 10,
  isFlipped:false,
  image: lm,
  isMatched: false
},
].sort(()=>Math.random()-0.5))
setCheck([])
setCount(0)
setWin(0)
setTries(0)
}

const duckImg = pic.map(pic =>(
    <img className="hover" key={pic.id} id={pic.id} src={pic.isFlipped||pic.isMatched?pic.image:gb} onClick={()=>{flip(pic.id);swap(pic.id)}} />
  ))
  return(
    <>
    <div className="main"style={{display:"flex", flexDirection:"column", gap:"30px", fontFamily:"monospace", justifyContent:"center", alignItems:"center"}}>
<h1 style={{textAlign:"center", border:"5px solid black", padding:"10px"}}>Image Flip</h1>
<p style={{fontSize:"15px",fontWeight:"bold",border:"5px solid black", padding:"10px"}}>flip the image to get the two correct image matched to win the game</p>

    <div className="image-container">
            {duckImg}
    </div>
    
    {win===5?
    <>
    <h1 style={{border:"5px solid black", padding:"10px"}}>You Win!</h1>
    <h1>You have tried to flip for {tries} times</h1>
    <button onClick={reset} style={{ fontFamily:"monospace", padding:"10px 20px", border:"1px solid black",borderRadius:"5px", cursor:"pointer"}}>Reset</button>
    </>
    
    :null}
    </div>
    
    </>
  )
}