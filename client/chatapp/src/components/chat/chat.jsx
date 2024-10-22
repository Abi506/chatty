import { useState, useEffect,useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { currentUserRoute } from '../../apiRoutes';
import Cookie from 'js-cookie';
import Contacts from '../contacts/contacts';
import { plainHost,allUsersRoute } from '../../apiRoutes';
import { PiWechatLogo } from "react-icons/pi";
import ChatContainer from '../chatContainer/chatContainer';
import { CiLogout } from "react-icons/ci";
import {io} from 'socket.io-client'
import './chat.css';

const Chat = () => {
    const socket=useRef()
    const [currentUserToken, setCurrentUserToken] = useState(undefined);
    const [currentUser, setCurrentUser] = useState(null); // State to store fetched user data
    const [currentChat, setCurrentChat] = useState(undefined);
    const [contacts,setContacts]=useState([])
    
    const navigate = useNavigate();

    useEffect(() => {
        const authToken = Cookie.get("authToken");
        

        if (!authToken) {
            navigate("/login");
        } else {
            // Set the current user token
            setCurrentUserToken(authToken);
        }
    }, [navigate]);

    useEffect(()=>{
        if(currentUser){
            socket.current=io(plainHost);
            socket.current.emit('add-user',currentUser._id)
        }
    },[currentUser])

    useEffect(() => {
        const fetchUsers = async () => {
            if (currentUserToken) { // Check the token before fetching
                try {
                    const response = await axios.get(`${currentUserRoute}`, {
                        headers: {
                            Authorization: `Bearer ${currentUserToken}` // Use currentUserToken
                        }
                    });
                    

                    setCurrentUser(response.data); // Set fetched user data
                } catch (error) {
                    console.error("Error fetching users:", error);
                }
            }
        };

        const fetchContacts = async () => {
            if (currentUserToken) { // Check the token before fetching
                try {
                    const response = await axios.get(`${allUsersRoute}`, {
                        headers: {
                            Authorization: `Bearer ${currentUserToken}` // Use currentUserToken
                        }
                    });
                    

                    setContacts(response.data); // Set fetched user data
                } catch (error) {
                    console.error("Error fetching users:", error);
                }
            }
        };

        fetchUsers(); // Call the function to fetch users
        fetchContacts()
    }, [currentUserToken]); // This effect runs only when currentUserToken changes

    //console.log(currentUser, 'currentUser');


    const handleChatChange = (chat) => {
        setCurrentChat(chat);
      };

      console.log(currentChat,"Current chat")

      const handleLogout=()=>{
        Cookie.remove("authToken")
        navigate("/login")
      }

    return (
        <div className='chat-main-container'>
            <div className='chat-full-container'>
            <div className='chat-logo-container'>
                <PiWechatLogo className='fs-1 text-primary'/>
            <h1 className='text-primary'>Chatty</h1>
            </div>
            <div>
            <button className='logout-button' onClick={handleLogout}><CiLogout/></button>
            </div>
            </div>
            <div className='chat-container'>
            <Contacts contacts={contacts} currentUser={currentUser} changeChat={handleChatChange}/> 
            {currentChat === undefined && currentUser ? (
                    <div className='welcome-message-container'>
                        <div>
                            <h1 className='welcome-message'>Welcome {currentUser.username}</h1>
                            <p>Please select a chat to start messaging</p>
                        </div>
                    </div>
                ) : (
                    <ChatContainer currentChat={currentChat} currentUser={currentUser} socket={socket}/>
                )}
            </div>
        </div>
    );
};

export default Chat;
