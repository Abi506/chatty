import {useState,useEffect} from 'react'

const Contacts = ({contacts,currentUser}) => {
    const[currentUserName,setCurrentUserName]=useState(undefined)
    const[currentUserImage,setCurrentUserImage]=useState(undefined)
    const[currentSelected,setCurrentSelected]=useState(undefined)


    useEffect(()=>{
        if(currentUser){
            setCurrentUserImage(currentUser.avatarImage)
            setCurrentUserName(currentUser.username)
        }
    },[currentUser])


    const changeCurrentChat=(index,contact)=>{
        
    }

  return (
    <div>
      <h1>Contatcs</h1>
    </div>
  )
}

export default Contacts
