import { greenApi } from ".";

export const receiveNotification = async () => {
  return await greenApi.get(
    "/waInstance${idInstance}/receiveNotification/${apiTokenInstance}"
  );
};
export const deleteNotification = async (receiptId: number) => {};
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
