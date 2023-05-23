export type ChatData = {
  idInstance: string;
  apiTokenInstance: string;
  phoneNumber: string;
};
export type ChatMessage = {
  message: string;
  type: string;
};
export type ChatList = {
  chatData: ChatData;
  messages: ChatMessage[];
};
export type CallbackFunction = (...args: any[]) => void;

export type NotificationMessage = {
  receiptId: number;
  body: {
    typeWebhook: string;
    chatId: string;
    instanceData: {
      idInstance: number;
      wid: string;
      typeInstance: string;
    };
    timestamp: number;
    idMessage: string;
    stateInstance: string;
    status?: string;
    sendByApi?: boolean;
    senderData: {
      chatId: string;
      chatName: string;
      sender: string;
      senderName: string;
    };
    messageData: {
      typeMessage: string;
      textMessageData: {
        textMessage: string;
      };
    };
  };
};
