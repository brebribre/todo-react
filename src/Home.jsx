import { useState, useEffect } from 'react';
import Popup from './Popup'

import Card from './Card'
const API_BASE = "http://localhost:3000";


function Home(){
    const [todos, setTodos] = useState([]);
    const [popupActive, setPopupActive] = useState(false);
    const [newTodo, setNewTodo] = useState("");

    useEffect(() => {
        GetTodos();
        
    }, [])

    const GetTodos = () => {
        fetch(API_BASE + "/todos")
        .then(res => res.json())
        .then(data => setTodos(data))
        .catch(err => console.log("Error: ", err))
    }

    const completeTodo = async id => {
        const data = await fetch(API_BASE + "/todo/complete/" + id)
            .then(res => res.json());


        setTodos(todos => todos.map(todo => {
            if(todo._id === data._id){
                todo.complete = data.complete;
                console.log("changed");
            }
            
            return todo;
        }))
    }

    const deleteTodo = async id => {
        const data = await fetch(API_BASE + "/todo/delete/" + id , {method: "DELETE"})
            .then(res => res.json());

        setTodos(todos => todos.filter(todo => todo._id !== data._id))
    }

    const addTodo = async () => {
        const data = await fetch(API_BASE + "/todo/new" , 
        {
            method: "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
                text: newTodo
            })
        }).then(res => res.json());
        
        setTodos([...todos, data]);
        setPopupActive(false);
        setNewTodo("");

    }


    return (
        <div className="grid py-10 justify-center text-gray-200">
				<h1 className="text-3xl text-center font-bold py-4">Welcome!</h1>
				<div className="todos">
                    {todos.map(todo => {
                        return (
                            <Card 
                                key={todo._id} 
                                text = {todo.text} 
                                complete = {todo.complete}
                                onClick = {() => completeTodo(todo._id)}
                                deleteClick = {() => deleteTodo(todo._id)}
                            />
                        )   
                    })}
                    
                 
				</div>

                <div className="addPopup" onClick={() => setPopupActive(true)}>
                +</div>
                
                {popupActive? (
                    <Popup 
                        onClick={() => setPopupActive(false)}
                        onChange = {e => setNewTodo(e.target.value)}
                        value = {newTodo}
                        onAdd = {() => addTodo()}
                        />
                ) : ''}
		</div>
    )
}
export default Home;