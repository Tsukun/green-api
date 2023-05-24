import * as React from "react";
import "./MainPage.css";
import ChatPreview from "../../components/ChatPreview/ChatPreview";
import { useEffect, useState } from "react";
import { ChatData, ChatList, NotificationMessage } from "../../types";
import Chat from "../Chat/Chat";
import {
  deleteNotification,
  receiveNotification,
} from "../../http/green-api-http";
import { promises } from "stream";

const MainPage: React.FC = () => {
  const [chatsList, setChatsList] = useState<ChatList[]>([]);
  const [chatData, setChatData] = useState<ChatData>({
    idInstance: "",
    apiTokenInstance: "",
    phoneNumber: "",
  });

  const [selectedChat, setSelectedChat] = useState<ChatData | undefined>(
    undefined
  );

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
        setChatsList((oldList) => [...oldList, { chatData, messages: [] }]);
      }
    }
  };
  const handleChatData = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChatData({ ...chatData, [event.target.name]: event.target.value });
  };

  const handleIncomingMessage = async () => {
    return await Promise.allSettled(
      chatsList.map((element: ChatList, index: number) => {
        return receiveNotification(
          element.chatData.idInstance,
          element.chatData.apiTokenInstance
        ).then((response) => {
          const responseData: NotificationMessage =
            response.data as NotificationMessage;
          if (responseData.body.typeWebhook === "incomingMessageReceived") {
            const chatIndex: number = chatsList
              .map((e) => e.chatData.phoneNumber)
              .indexOf(responseData.body.senderData.sender.split("@")[0]);
            console.log(responseData);

            if (chatIndex === -1) {
              deleteNotification(
                element.chatData.idInstance,
                element.chatData.apiTokenInstance,
                responseData.receiptId
              );
              return responseData;
            }
            const destructiveChatList: ChatList[] = [...chatsList];
            console.log(responseData.body.messageData);
            destructiveChatList[chatIndex] = {
              chatData: destructiveChatList[chatIndex].chatData,
              messages: [
                ...destructiveChatList[chatIndex].messages,
                {
                  message:
                    responseData.body.messageData.textMessageData.textMessage,
                  type: "another",
                },
              ],
            };
            setChatsList(destructiveChatList);
          }
          deleteNotification(
            element.chatData.idInstance,
            element.chatData.apiTokenInstance,
            responseData.receiptId
          );
          return responseData;
        });
      })
    );
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
  useEffect(() => {
    return setChatsList(
      JSON.parse(
        !localStorage.getItem("chatsHistory")
          ? "[]"
          : localStorage.getItem("chatsHistory")!
      )
    );
  }, []);
  useEffect(() => {
    if (chatsList.length > 0)
      localStorage.setItem("chatsHistory", JSON.stringify(chatsList));
  }, [chatsList]);

  const clearChatsList = () => {
    localStorage.clear();
    setChatsList([]);
    setSelectedChat(undefined);
    setChatData({
      idInstance: "",
      apiTokenInstance: "",
      phoneNumber: "",
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
                <div className="leftbar-item">
                  <button
                    className="system-buttons"
                    onClick={handleIncomingMessage}
                  >
                    Update Chat Message
                  </button>
                  <button className="system-buttons" onClick={clearChatsList}>
                    Clear All Chats
                  </button>
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
              chatsList.map((element: ChatList, index: number) => {
                return (
                  element.chatData.phoneNumber == selectedChat.phoneNumber && (
                    <Chat
                      {...element}
                      key={"chat" + index}
                      setChatsList={setChatsList}
                      chatsList={chatsList}
                      chatIndex={index}
                    ></Chat>
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
