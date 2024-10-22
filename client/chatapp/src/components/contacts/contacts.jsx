import { useState } from 'react';
import { plainHost } from '../../apiRoutes';
import './contacts.css';

const Contacts = ({ contacts, currentUser, changeChat }) => {
    // Log contacts and current user for debugging
    // console.log(contacts, 'contacts from contacts page');
    // console.log(currentUser, 'current user from current user page');

    const [activeChatIndex, setActiveChatIndex] = useState(null);

    const changeCurrentChat = (index, contact) => {
        setActiveChatIndex(index); // Set the clicked contact's index as active
        console.log(`Active chat with: ${contact.username}`);
        changeChat(contact);
    };

    return (
        <div className='contacts-container'>
            {contacts && (
                <ul className='contact-lists'>
                    {/* Only map through contacts if they exist */}
                    {contacts
                        .filter((eachUser) => eachUser._id !== currentUser?._id) // Optional chaining for currentUser
                        .map((eachUser, index) => (
                            <li 
                                key={eachUser._id} 
                                className={`each-user-list shadow ${activeChatIndex === index ? 'active-chat' : ''}`} // Add active class based on the index
                                onClick={() => changeCurrentChat(index, eachUser)} 
                            > 
                                <img 
                                    src={`${plainHost}${eachUser.userAvatarImage}`} 
                                    alt="User Avatar" 
                                    className="users-avatar"
                                />
                                <h1 className='each-user-name'>{eachUser.username}</h1>
                            </li>
                        ))}
                    
                    {currentUser && (
                        <li className='each-user-list shadow special-list mt-5 text-white'>
                            <img 
                                src={`${plainHost}${currentUser.userAvatarImage}`} 
                                alt="Current User Avatar" 
                                className="users-avatar"
                            />
                            <h1 className='each-user-name'>{currentUser.username}</h1>
                        </li>
                    )}
                </ul>
            )}
        </div>
    );
}

export default Contacts;
