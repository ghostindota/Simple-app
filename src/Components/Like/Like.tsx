import React, { useState } from "react";
import { TiHeartFullOutline } from "react-icons/ti";
import { IoMdHeartEmpty } from "react-icons/io";

interface Props{
    onClick: () => void;
}

const Like = ({onClick}:Props) => {
  const toggle = ()=>{
    
    full(!empty);
    onClick();
    
  }
  const [empty, full] = useState(true);
  if (empty) 
    return <TiHeartFullOutline size={30} color="red" onClick={toggle} />;
    return <IoMdHeartEmpty size ={30} onClick={toggle}/>

}; export default Like;
