import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import "./Chat.css";
import Message from "../../components/Message/Message";
import { ChatList, ChatMessage } from "../../types";
import { sendMessage } from "../../http/green-api-http";

type ChatProps = ChatList & {
  chatIndex: number;
  setChatsList: Dispatch<SetStateAction<ChatList[]>>;
  chatsList: ChatList[];
};

const Chat: React.FC<ChatProps> = ({
  chatData,
  messages,
  chatsList,
  chatIndex,
  setChatsList,
}: ChatProps) => {
  const [sendedMessage, setSendedMessage] = useState<string>("");
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const temp_message = { message: sendedMessage, type: "own" };
      const destructiveChatList: ChatList[] = [...chatsList];
      destructiveChatList[chatIndex] = {
        chatData,
        messages: [...messages, temp_message],
      };
      setChatsList(destructiveChatList);

      sendMessage(
        chatData.idInstance,
        chatData.apiTokenInstance,
        chatData.phoneNumber,
        temp_message.message
      );

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
            {messages.map((element, index) => {
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
