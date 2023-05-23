import React, { Component } from "react";
import "./Message.css";

type MessageProps = {
  message: string;
  type: string;
};

const Message: React.FC<MessageProps> = ({ message, type }: MessageProps) => {
  return (
    <>
      <div className={`message-container my-message ${type}`}>
        <div className="message-text">{message}</div>
      </div>
    </>
  );
};

export default Message;
