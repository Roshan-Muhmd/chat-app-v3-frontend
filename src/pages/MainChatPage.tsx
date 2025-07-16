import ChatPage from '../components/ChatPage'
import useAuthCheck from '../hooks/useAuthCheck'


function MainChatPage() {

  useAuthCheck()



  return (
    <ChatPage />
  )
}

export default MainChatPage