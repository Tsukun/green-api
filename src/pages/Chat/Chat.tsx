import React, { useEffect, useState } from "react";
import "./Chat.css";
import Message from "../../components/Message/Message";
import { ChatList, ChatMessage } from "../../types";

const Chat: React.FC<ChatList> = ({ chatData, messages }: ChatList) => {
  const [messagesList, setMessagesList] = useState<ChatMessage[]>(messages);
  const [sendedMessage, setSendedMessage] = useState<string>("");
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      messages.push({ message: sendedMessage, type: "own" });

      setMessagesList((prevMessages) => [
        ...prevMessages,
        { message: sendedMessage, type: "own" },
      ]);
      setSendedMessage("");
    }
  };
  const handleMessage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSendedMessage(event.target.value);
  };

  return (
    <>
      <div className="chat-container">
        <div className="chat-items">
          <div className="chat-header">
            <div className="chat-header-name">
              {" "}
              +
              {`${chatData.phoneNumber.slice(0, 1)} 
                  (${chatData.phoneNumber.slice(
                    1,
                    4
                  )}) ${chatData.phoneNumber.slice(
                4,
                7
              )}-${chatData.phoneNumber.slice(
                7,
                9
              )}-${chatData.phoneNumber.slice(9, chatData.phoneNumber.length)}`}
            </div>
          </div>
          <div className="chat-view">
            {messagesList.map((element, index) => {
              return (
                <Message
                  message={element.message}
                  type={element.type}
                  key={"message" + index}
                ></Message>
              );
            })}
          </div>
          <div className="chat-footer">
            <input
              type="text"
              className="chat-input"
              placeholder="Say something..."
              value={sendedMessage}
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
