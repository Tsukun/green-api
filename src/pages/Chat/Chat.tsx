import React, { useEffect, useState } from "react";
import "./Chat.css";
import Message from "../../components/Message/Message";
import { chatData } from "../../types";

const Chat: React.FC<chatData> = ({
  idInstance,
  apiTokenInstance,
  phoneNumber,
}: chatData) => {
  const [messagesList, setMessagesList] = useState<string[]>([]);
  const [message, setMessage] = useState<string>("");
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setMessagesList((prevMessages) => [...prevMessages, message]);
      setMessage("");
    }
  };
  const handleMessage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };
  useEffect(() => {
    console.log(idInstance, apiTokenInstance, phoneNumber);
  }, []);
  return (
    <>
      <div className="chat-container">
        <div className="chat-items">
          <div className="chat-header">
            <div className="chat-header-name">
              {" "}
              +
              {`${phoneNumber.slice(0, 1)} 
                  (${phoneNumber.slice(1, 4)}) ${phoneNumber.slice(
                4,
                7
              )}-${phoneNumber.slice(7, 9)}-${phoneNumber.slice(
                9,
                phoneNumber.length
              )}`}
            </div>
          </div>
          <div className="chat-view">
            {messagesList.map((element, index) => {
              return (
                <Message message={element} type="own" key={index}></Message>
              );
            })}
          </div>
          <div className="chat-footer">
            <input
              type="text"
              className="chat-input"
              placeholder="Say something..."
              value={message}
              onKeyDown={handleKeyPress}
              onChange={handleMessage}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
