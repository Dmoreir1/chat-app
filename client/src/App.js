
import './App.css';
// import React from 'react';
import io from 'socket.io-client'
import { useState } from 'react';
import Chat from './Chat.js';



const socket = io.connect('http://localhost:3003')


function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => { 
    if(username !== "" && room !== ""){
      socket.emit('join_room', room)
      setShowChat(true);
      console.log(`User with username ${username} and room ${room} joined`)
    }
  

  }

  return (
    <div className="App"> <h1>Welcome to my instant messenger! </h1>
      <h2> ⚓By Dan Moreira 🔥 </h2>
      {!showChat ? (   
      <div className = "joinChatContainer">
        <h2>😎🖐</h2>
      <h2> Let's Chat!  </h2>
      <h1>🦜  🗣 </h1>
      <input type="text" placeholder = "Screen-name aka SN" onChange = { (event) => { setUsername(event.target.value)}} />
      <input type="text" placeholder = "Choose a room" onChange = { (event) => setRoom(event.target.value)}  />
      <button onClick = {joinRoom}> Join le Room </button>

      </div>
  )
  : (
      <Chat socket = {socket} username = {username} room = {room}  /> )}

    </div>
   
    
  );
}

export default App;

   // {/* <button onClick={() => socket.emit('hello', 'world')}>
      //   Send
      // </button>
      // <button onClick={() => socket.emit('bye')}>
      //   Send
      // </button>
      // <button onClick={() => socket.emit('hi')}>
      //   Send
      //   </button> */}