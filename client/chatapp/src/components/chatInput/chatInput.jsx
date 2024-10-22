import { useState } from 'react';
import { IoMdSend } from 'react-icons/io';
import { BsEmojiSmileFill } from 'react-icons/bs';
import './chatInput.css';

const ChatInput = ({ handleSendMsg }) => {
  const [msg, setMsg] = useState('');

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg(''); // Clear the message after sending
    }
  };

  return (
    <div className='chat-input-container'>
      <form className='input-container' onSubmit={sendChat}>
        <input
          type='text'
          placeholder='Type your message here'
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          className='chat-input-element'
        />
        <button className='submit' type='submit'>
          <IoMdSend />
        </button>
      </form>
    </div>
  );
};

export default ChatInput;
