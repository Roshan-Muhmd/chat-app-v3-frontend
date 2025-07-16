import socketInstance from "./socketUtils"

export const sendMessage = (message : string , activeChat: { [key: string]: any },userData:any) => {
debugger
    socketInstance.emit('sendMessage',{ message,partnerId:activeChat.socketId,email:userData?.email})
    
   }