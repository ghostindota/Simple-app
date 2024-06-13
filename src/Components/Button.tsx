import React, { ReactNode } from "react";


interface Props {
  children: ReactNode;
  onClick : () => void;
  color? : 'primary' | 'secondary' | 'success';
}
const Button = ( {children, onClick, color ='primary'} : Props) => {
  return <div className= {'btn btn-' + color} onClick={onClick}>{children}</div>;
};

export default Button;
