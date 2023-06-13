import { useState, useEffect } from 'react';

function Popup(props){
      
    return (
        <div className="flex py-2 px-4 border-4 rounded-md w-80" >
                <div className="flex-auto w-64">
                    <input type="text" className="text-gray-800" onChange={props.onChange}></input>
                    
                </div>
                <div className ="button flex-auto mr-5" onClick={props.onAdd}>
                    Add
                </div>
                <div className="flex-auto" onClick={props.onClick}>
                    X
                </div>
		</div>)
}
export default Popup;