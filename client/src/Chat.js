import React, { useMemo } from 'react';
// import { useEffect, useState } from 'react';
import ScrollToBottom  from 'react-scroll-to-bottom';

function Chat({socket, username, room}) {
    const [currentMessage, setCurrentMessage] = React.useState(""); 
    const [messageList, setMessageList] = React.useState([]); 

    const sendMessage = async () => {
        if(currentMessage !== "") {
            const messageData = {
                room: room,
                username: username,
                message: currentMessage,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
            };

            await socket.emit("send_message", messageData);
            setMessageList((list) => [...list, messageData]);
            setCurrentMessage("");
        

            
        };
    };

    useMemo(() => {
        socket.on("receive_message", (data) => {
            setMessageList((list) => [...list, data]);
        

    }
    );
    }, [socket]);

    return (
        <div>
            <div className = "chat-window"> /
            <div className = "chat-header">
            <p>We're Live!</p>
            </div>
            <div className = "chat-body"> 
            <ScrollToBottom className = "message-container">
            {messageList.map((messageContent) => {
                return (<div className = "message" id = {username === messageContent.username ? "you" : "other"}> 
                    <div>
                        <div className = "message-meta">
                        <p id = "time" >{messageContent.username} </p> <p id = "username">  {messageContent.time}</p>
                    </div>
                    <div className = "message-content">
                    <p >{messageContent.message}</p>
                    </div>
                    </div>
                </div> 
                // <h1> {messageContent.username} : {messageContent.message} </h1>
                )
            })}
            </ScrollToBottom> 
            </div>
            <div className = "chat-footer">
                <input type = "text" value = {currentMessage} placeholder = "Type your message" onChange = { (event) => setCurrentMessage(event.target.value)} />
                <button onClick= {sendMessage} className = "send-button" disabled = {!currentMessage.trim()}>Send&#9658;</button>
                </div>   
        </div>
    </div>
    );

}

export default Chat;

// socket.emit("send_message", messageData);
            // setCurrentMessage("");