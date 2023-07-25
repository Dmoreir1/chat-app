import React, { useEffect } from 'react';

function Chat({socket, username, room}) {
    const [currentMessage, setCurrentMessage] = React.useState(""); 

    const sendMessage = async () => {
        if(currentMessage !== "") {
            const messageData = {
                room: room,
                username: username,
                message: currentMessage,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
            };

            await socket.emit("send_message", messageData);
        

            // socket.emit("send_message", messageData);
            // setCurrentMessage("");
        };
    };

    useEffect(() => {
        socket.on("receive_message", (data) => {

    }
    );
    }, [socket]);

    return (
        <div>
            <div className = "chat-window"> /
            <div className = "chat-header">
            <p>Live Talk!</p>
            </div>
            <div className = "chat-body"></div> 
            <div className = "chat-footer"></div>
                <input type = "text" placeholder = "Type your message" onChange = { (event) => setCurrentMessage(event.target.value)} />
                <button onClick= {sendMessage} className = "send-button" disabled = {!currentMessage.trim()}>Send  &#9658;</button>   
        </div>
    </div>
    );

}

export default Chat;