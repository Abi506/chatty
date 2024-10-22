import { useState, useEffect,useRef } from 'react';
import { getAllMessagesRoute, plainHost, sendMessageRoute } from '../../apiRoutes';
import ChatInput from '../chatInput/chatInput';
import axios from 'axios';
import {v4 as uuidv4} from 'uuid'
import './chatContainer.css';

const ChatContainer = ({ currentChat, currentUser,socket }) => {
    const [messages, setMessages] = useState([]);
    const [arrivalMessage,setArrivalMessage]=useState(null)
    const scrollRef=useRef()
    const handleSendMsg = async (msg) => {
        if (currentUser && currentChat) {
            await axios.post(sendMessageRoute, {
                from: currentUser._id,
                to: currentChat._id,
                message: msg
            });
            socket.current.emit("send-msg",{
                to:currentChat._id,
                from:currentUser._id,
                message:msg, 
            })

            const msgs=[...messages]
            msgs.push({fromSelf:true,message:msg});
            setMessages(msgs)
        }
    };

    useEffect(()=>{
        if(socket.current){
            socket.current.on('msg-recieve',(msg)=>{
                setArrivalMessage({fromSelf:false,message:msg})
            })
        }
    },[])

    useEffect(()=>{
        arrivalMessage && setMessages((prev)=>[...prev,arrivalMessage]);
    },[arrivalMessage])

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    useEffect(() => {
        const fetchMessages = async () => {
            if (currentUser && currentChat) {
                const response = await axios.post(getAllMessagesRoute, {
                    from: currentUser._id,
                    to: currentChat._id
                });
                setMessages(response.data);
            }
        };

        fetchMessages();
    }, [currentChat, currentUser]);

    if (!currentUser || !currentChat) {
        return <div>Loading chat...</div>;
    }

    return (
        <div className='chat-container-header'>
            <div className='chat-header bg-primary text-white'>
                <img
                    src={`${plainHost}${currentChat.userAvatarImage}`}
                    alt="User Avatar"
                    className='chat-header-avatar-image'
                />
                <h1 className='chat-header-username'>{currentChat.username.toUpperCase()}</h1>
            </div>
            <div className='chat-messages'>
                {messages.map((message, index) => (
                    <div key={uuidv4()} ref={scrollRef} className={`message ${message.fromSelf ? "sended" : "received"}`}>
                        <div className='content'>
                            <p className='user-sended-message'>{message.message}</p>
                        </div>
                    </div>
                ))}
            </div>
            <ChatInput handleSendMsg={handleSendMsg} />
        </div>
    );
};

export default ChatContainer;
