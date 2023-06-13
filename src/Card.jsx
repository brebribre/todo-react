import { useState, useEffect } from 'react';

function Card(props){

    return (
        <div className="flex py-2 my-6 px-4 border-4 rounded-md w-80" >
            <div className="flex-auto pr-2 py-1">
                <input type="checkbox" onClick = {props.onClick}></input>
            </div>
            <div className={`flex-auto w-64 py-1 ${props.complete ? "line-through" : ""}`}>
                {props.text}
            </div>
            <div className="flex-auto py-1" onClick = {props.deleteClick}>
                X
            </div>
            
		</div>
    )
}
export default Card;