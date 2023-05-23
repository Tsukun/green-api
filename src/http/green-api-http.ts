import { greenApi } from ".";

export const receiveNotification = async (
  idInstance: string,
  apiTokenInstance: string
) => {
  return await greenApi.get(
    `/waInstance${idInstance}/receiveNotification/${apiTokenInstance}`
  );
};
export const deleteNotification = async (
  idInstance: string,
  apiTokenInstance: string,
  receiptId: number
) => {
  return await greenApi.delete(
    `/waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${receiptId}`
  );
};
export const sendMessage = async (
  idInstance: string,
  apiTokenInstance: string,
  phoneNumber: string,
  message: string
) => {
  return await greenApi.post(
    `/waInstance${idInstance}/sendMessage/${apiTokenInstance}`,
    {
      chatId: phoneNumber + "@c.us",
      message: message,
    }
  );
};
