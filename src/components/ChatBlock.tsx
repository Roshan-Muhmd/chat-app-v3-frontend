import React ,{useRef} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import EmptyChatBlock from './EmptyChatBlock'
import { sendMessage } from '../utils/chatUtils'
import { RootState } from '@reduxjs/toolkit/query'
import { updateChatLog } from '../redux/slices/ChatSLice'

function ChatBlock() {

  const messageInputRef = useRef(null)
  const activeChat = useSelector((state)=>state?.chat?.activeChatData)
  const userData = useSelector((state: RootState)=> state.auth.userData)
  const chatLog = useSelector((state)=> state?.chat?.chatLog)
  const currenctChat = chatLog[activeChat?.email] || []
  const dispatch = useDispatch()


  const sendMessageHandler = ()=> {
    const message = messageInputRef?.current?.value
    sendMessage(message,activeChat,userData)
     dispatch(updateChatLog({message,email:activeChat?.email,type:0}))
  }
 
 
  if(!activeChat) return <EmptyChatBlock/>


  //  const chatLog = useSelector((state)=>state?.chat?.chatLog?.[activeChat?.email])

  
  return (
    <div className="chat">
              <div className="chat-header clearfix">
                <div className="row">
                  <div className="col-lg-6">
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#view_info"
                    >
                      <img
                        src="https://bootdey.com/img/Content/avatar/avatar2.png"
                        alt="avatar"
                      />
                    </a>
                    <div className="chat-about">
                      <h6 className="m-b-0">{activeChat.userName}</h6>
                      <small>Last seen: 2 hours ago</small>
                    </div>
                  </div>
                  <div className="col-lg-6 hidden-sm text-right">
                    <a
                      href="javascript:void(0);"
                      className="btn btn-outline-secondary"
                    >
                      <i className="fa fa-camera" />
                    </a>
                    <a
                      href="javascript:void(0);"
                      className="btn btn-outline-primary"
                    >
                      <i className="fa fa-image" />
                    </a>
                    <a
                      href="javascript:void(0);"
                      className="btn btn-outline-info"
                    >
                      <i className="fa fa-cogs" />
                    </a>
                    <a
                      href="javascript:void(0);"
                      className="btn btn-outline-warning"
                    >
                      <i className="fa fa-question" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="chat-history">
                <ul className="m-b-0">
                  {currenctChat?.length > 0 && currenctChat?.map((message)=>{
                    return (
                      <li className={message?.type == 1 ? 'incoming' : 'outgoing'}>{message?.value}</li>
                    )
                  })}
                  </ul>
              </div>
              <div className="chat-message clearfix">
                <div className="input-group mb-0">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fa fa-send" />
                    </span>
                  </div>
                  <input
                  ref={messageInputRef}
                  onKeyDown={(event)=>{
                    if (event.key === "Enter") {
                      sendMessageHandler()
                    }
                  }}
                    type="text"
                    className="form-control"
                    placeholder="Enter text here..."
                  />
                  <button onClick={sendMessageHandler}>Send</button>
                </div>
              </div>
            </div>
  )
}

export default ChatBlock