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
