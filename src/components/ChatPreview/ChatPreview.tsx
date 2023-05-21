import React, { useEffect } from "react";
import "./ChatPreview.css";
import test_logo from "../../icons/logo-test.jpg";
import { CallbackFunction } from "../../types";
import { ChatData } from "../../types";
type chatPreviewProps = {
  handleClick: CallbackFunction;
  active: boolean;
} & ChatData;
const ChatPreview: React.FC<chatPreviewProps> = ({
  idInstance,
  apiTokenInstance,
  phoneNumber,
  handleClick,
  active,
}: chatPreviewProps) => {
  useEffect(() => {
    console.log(active);
  }, [active]);
  return (
    <>
      <div
        className="chatpreview-container"
        onClick={() =>
          handleClick({ idInstance, apiTokenInstance, phoneNumber })
        }
      >
        <div
          className={`chatpreview-sections ${
            active ? "chatpreview-selected" : ""
          }`}
        >
          <div className="chatpreview-logo">
            <img src={test_logo} />
          </div>
          <div className="chatpreview-section">
            <div className="chatpreview-content">
              <div className="chatpreview-name">
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
              <div className="chatpreview-message">
                <div className="idInstance">idInstance:{idInstance}</div>
                <div className="apiToken">
                  apiTokenInstance:{apiTokenInstance}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatPreview;
