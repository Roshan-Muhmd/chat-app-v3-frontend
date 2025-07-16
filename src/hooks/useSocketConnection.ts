import React, { useEffect,useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import socketInstance from '../utils/socketUtils'
import { updateChatLog } from '../redux/slices/ChatSLice'

function useSocketConnection() {

  const userData = useSelector((state: RootState)=> state.auth.userData)
  const [onlineUserList, setOnlineUserList] = useState([])
  const dispatch = useDispatch()
  
useEffect(() => {
  function handleConnect() {
    if (userData) {
      socketInstance.emit('updateConnectStatus', { status: 'online', userData });
    }
  }

  function handleOnlineUserListUpdate(data: any) {
    console.log("🟢 onlineUserListUpdate triggered:", data);
    if (data.userList) {
      const onlineList = data.userList.filter((user: any) => user.email !== userData?.email);
      setOnlineUserList(onlineList);
    }
  }

  function handleIncomingMessage(data: any) {
    debugger
    if(data?.email){
      dispatch(updateChatLog({type:1,...data}))
    }
  }

  // Always set up listeners
  socketInstance.on('connect', handleConnect);
  socketInstance.on('onlineUserListUpdate', handleOnlineUserListUpdate);
  socketInstance.on('incomingMessage', handleIncomingMessage);

  // If already connected and userData is valid, send status
  if (socketInstance.connected && userData) {
    socketInstance.emit('updateConnectStatus', { status: 'online', userData });
  }

  return () => {
    // Clean up listeners to avoid duplicates
    socketInstance.off('connect', handleConnect);
    socketInstance.off('onlineUserListUpdate', handleOnlineUserListUpdate);
    socketInstance.off('incomingMessage', handleIncomingMessage);
  };
}, [userData]);




return {onlineUserList,userData}

  
}

export default useSocketConnection