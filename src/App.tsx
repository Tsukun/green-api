import React, { useState } from "react";
import "./App.css";
import Chat from "./pages/Chat/Chat";
import { chatData } from "./types";
import MainPage from "./pages/MainPage/MainPage";
function App() {
  const [selectedChat, setSelectedChat] = useState<chatData>({
    idInstance: "",
    apiTokenInstance: "",
    phoneNumber: "",
  });
  return (
    <>
      <MainPage></MainPage>
    </>
  );
}

export default App;
