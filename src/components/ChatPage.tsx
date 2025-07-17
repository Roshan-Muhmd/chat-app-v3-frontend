import "../assets/css/chat_page.css";
import useSocketConnection from "../hooks/useSocketConnection";
import ChatBlock from "./ChatBlock";
import { useDispatch } from "react-redux";
import { selectActiveChat } from "../redux/slices/ChatSlice";


const ChatPage = () => {
  const {onlineUserList,userData} = useSocketConnection();
  debugger
  console.log('onlineUserList',onlineUserList)
  const dispatch = useDispatch()

  return (
    <div className="container">
      <div className="row clearfix">
        <div className="col-lg-12">
          <div className="card chat-app">
            <div id="plist" className="people-list">
              <div>{userData?.userName}</div>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fa fa-search" />
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search..."
                />
              </div>
              <ul className="list-unstyled chat-list mt-2 mb-0">
                {onlineUserList.map((user: { [key: string]: any }) => {
                  
                  return (
                    <li className="clearfix" onClick={()=>{
                      
                      dispatch(selectActiveChat({userData:user}))}}>
                      <img
                        src="https://bootdey.com/img/Content/avatar/avatar1.png"
                        alt="avatar"
                      />
                      <div className="about">
                        <div className="name">{user.userName}</div>
                        <div className="status">
                          {" "}
                          <i className="fa fa-circle offline" /> left 7 mins ago{" "}
                        </div>
                      </div>
                    </li>
                  );
                })}
               {/*  <li className="clearfix active">
                  <img
                    src="https://bootdey.com/img/Content/avatar/avatar2.png"
                    alt="avatar"
                  />
                  <div className="about">
                    <div className="name">Aiden Chavez</div>
                    <div className="status">
                      {" "}
                      <i className="fa fa-circle online" /> online{" "}
                    </div>
                  </div>
                </li>
                <li className="clearfix">
                  <img
                    src="https://bootdey.com/img/Content/avatar/avatar3.png"
                    alt="avatar"
                  />
                  <div className="about">
                    <div className="name">Mike Thomas</div>
                    <div className="status">
                      {" "}
                      <i className="fa fa-circle online" /> online{" "}
                    </div>
                  </div>
                </li>
                <li className="clearfix">
                  <img
                    src="https://bootdey.com/img/Content/avatar/avatar7.png"
                    alt="avatar"
                  />
                  <div className="about">
                    <div className="name">Christian Kelly</div>
                    <div className="status">
                      {" "}
                      <i className="fa fa-circle offline" /> left 10 hours ago{" "}
                    </div>
                  </div>
                </li>
                <li className="clearfix">
                  <img
                    src="https://bootdey.com/img/Content/avatar/avatar8.png"
                    alt="avatar"
                  />
                  <div className="about">
                    <div className="name">Monica Ward</div>
                    <div className="status">
                      {" "}
                      <i className="fa fa-circle online" /> online{" "}
                    </div>
                  </div>
                </li>
                <li className="clearfix">
                  <img
                    src="https://bootdey.com/img/Content/avatar/avatar3.png"
                    alt="avatar"
                  />
                  <div className="about">
                    <div className="name">Dean Henry</div>
                    <div className="status">
                      {" "}
                      <i className="fa fa-circle offline" /> offline since Oct
                      28{" "}
                    </div>
                  </div>
                </li> */}
              </ul>
            </div>
           <ChatBlock/>
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
