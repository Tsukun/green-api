import * as React from "react";
import "./MainPage.css";
import ChatPreview from "../../components/ChatPreview/ChatPreview";
import { useState } from "react";
import { ChatData, ChatList } from "../../types";
import Chat from "../Chat/Chat";

const MainPage: React.FC = () => {
  const [chatsList, setChatList] = useState<ChatList[]>([]);
  const [chatData, setChatData] = useState<ChatData>({
    idInstance: "",
    apiTokenInstance: "",
    phoneNumber: "",
  });

  const [selectedChat, setSelectedChat] = useState<ChatData>();

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      console.log(chatData);
      if (chatData.phoneNumber.length != 11) {
        alert("Указан некорректный номер");
        setChatData({
          idInstance: "",
          apiTokenInstance: "",
          phoneNumber: "",
        });
        return;
      }
      if (
        chatData.apiTokenInstance === "" ||
        chatData.idInstance === "" ||
        chatData.phoneNumber === ""
      ) {
        alert("Заполните все поля ввода");
      } else {
        if (
          chatsList.some(
            (element) => element.chatData.phoneNumber === chatData.phoneNumber
          )
        ) {
          alert("Данный чат уже существует");
          setChatData({
            idInstance: "",
            apiTokenInstance: "",
            phoneNumber: "",
          });
          return;
        }
        setChatData({ idInstance: "", apiTokenInstance: "", phoneNumber: "" });
        setChatList((oldList) => [...oldList, { chatData, messages: [] }]);
      }
    }
  };
  const handleChatData = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChatData({ ...chatData, [event.target.name]: event.target.value });
  };

  const handleSelectedChat = ({
    idInstance,
    apiTokenInstance,
    phoneNumber,
  }: ChatData) => {
    console.log(idInstance, apiTokenInstance, phoneNumber);
    setSelectedChat({
      ...selectedChat,
      idInstance,
      apiTokenInstance,
      phoneNumber,
    });
  };
  return (
    <>
      <div className="container">
        <div className="section">
          <div className="row_leftbar">
            <div className="leftbar-container">
              <div className="lefbar-items">
                <div className="leftbar-item">
                  <input
                    type="text"
                    name="idInstance"
                    className="api-input"
                    placeholder="idInstance"
                    value={chatData.idInstance}
                    onChange={handleChatData}
                  />
                </div>
                <div className="leftbar-item">
                  <input
                    type="text"
                    className="api-input"
                    name="apiTokenInstance"
                    placeholder="apiTokenInstance"
                    value={chatData.apiTokenInstance}
                    onChange={handleChatData}
                  />
                </div>
                <div className="leftbar-item">
                  <div className="search-input">
                    <input
                      type="text"
                      className="search"
                      name="phoneNumber"
                      placeholder="Search or start new chat"
                      value={chatData.phoneNumber}
                      onChange={handleChatData}
                      onKeyDown={handleKeyPress}
                    />
                  </div>
                </div>

                {chatsList.map((element, index) => {
                  return (
                    <div className="leftbar-item">
                      <ChatPreview
                        key={"chatpreview" + index}
                        {...element.chatData}
                        active={
                          element.chatData.phoneNumber ==
                          selectedChat?.phoneNumber
                        }
                        handleClick={handleSelectedChat}
                      ></ChatPreview>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="row_leftbar">
            {selectedChat ? (
              chatsList.map((element, index) => {
                return (
                  element.chatData.phoneNumber == selectedChat.phoneNumber && (
                    <Chat {...element} key={"chat" + index}></Chat>
                  )
                );
              })
            ) : (
              <div className="mainpage-background"></div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MainPage;
