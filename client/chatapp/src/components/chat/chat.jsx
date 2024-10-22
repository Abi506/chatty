import {useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { allUsersRoute } from '../../apiRoutes'
import Cookie from 'js-cookie'
import Contacts from '../contacts/contacts'
import './chat.css'

const Chat = () => {
    const [contacts,setContacts]=useState([]);
    const[currentUser,setCurrentUser]=useState(undefined)
    const navigate=useNavigate()
    useEffect(async()=>{
        if(Cookies.get("authToken")){
            navigate("/login")
        }
        else{
            setCurrentUser(await JSON.parse(Cookie.get('authToken')))
        }
    },[])

    useEffect(async()=>{
        if(currentUser){
            const data=await axios.get(`${allUsersRoute}/${currentUser._id}`)
            console.log(data,'data from backend')
            setContacts(data.data)
        }
    },[currentUser])
  return (
    <div className='chat-container'>
      <Contacts contacts={contacts} currentUser={currentUser}/>
    </div>
  )
}

export default Chat
