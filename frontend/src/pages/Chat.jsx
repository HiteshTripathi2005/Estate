import React from "react";
import ChatMain from "../components/chat/ChatMain";
import ChatSlider from "./../components/chat/ChatSlider";
import AuthNavbar from "../components/common/AuthNavbar";

const Chat = () => {
  return (
    <div>
      <AuthNavbar />
      <ChatSlider />
      {/* <ChatMain /> */}
    </div>
  );
};

export default Chat;
