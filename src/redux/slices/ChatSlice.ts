import { createSlice } from "@reduxjs/toolkit";

const ChatSlice = createSlice({
    name: "ChatSlice",
    initialState:{
        activeChatData:null,
        chatLog: {}
    },
    reducers :{
        selectActiveChat : (state,action) =>{
            
            state.activeChatData = action.payload.userData

        },
        updateChatLog : (state,action) => {
            debugger
            const data = action.payload
            let temp = state?.chatLog[data?.email]
            if(!temp){
                temp = []
            }

            temp.push({type:data?.type,  value:data?.message})
            state.chatLog[data.email] = temp

        }
    }
})

export const {selectActiveChat,updateChatLog} = ChatSlice.actions
export default ChatSlice.reducer