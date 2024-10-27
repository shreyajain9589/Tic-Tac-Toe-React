import React from 'react';
import "./Square.css"
        
function Square({value, onClick}) {
    return (
        <>
        <button className="btnSquare" onClick={onClick}>
            {value}
        </button>
        </>
        );
    }
        
export default Square;