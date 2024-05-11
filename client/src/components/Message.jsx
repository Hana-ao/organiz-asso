import React, { useState } from 'react';
import '../styles/Message.css';
import DeleteMessage from './DeleteMessage';
import ReplyMessage from './ReplyMessage';
import RepliesList from './RepliesList';
import axios from 'axios';
import {BrowserRouter, Link} from "react-router-dom";



function Message({ ident, author, content, date, onDeleteMessage, replies, topic, currentUser }) {
    const [showReplies, setShowReplies] = useState(false);
    const [replyMessages, setReplyMessages] = useState([]);

    console.log(replies);

    const handleToggleReplies = async () => {
        setShowReplies(!showReplies);
        // Si les réponses ne sont pas encore chargées et que le composant est ouvert
        if (!replyMessages.length && showReplies) {
            try {
                // Récupérez les messages correspondant aux IDs de réponses
                const response = await axios.post('/api/messages/replies', { replyIds: replies });
                setReplyMessages(response.data);
            } 
            catch (error) {
                console.error('Erreur lors de la récupération des réponses :', error);
            }
        }
    };

    const handleDeleteMessage = () => {
        onDeleteMessage(ident);
    };

    return (
        <div className='message-item'>
        <BrowserRouter forceRefresh ={true}>

            <p>Le {date} :<br></br> <strong>{author}</strong> a écrit "<strong>{content}</strong>" </p>
            

            <button onClick={handleToggleReplies}>Réponses</button>

            {showReplies && replyMessages.length > 0 && (
                <>
                    <ul>
                        {replyMessages.map((reply, index) => (
                            <li key={index}>
                                <Message
                                    ident={reply._id}
                                    author={reply.author}
                                    content={reply.content}
                                    date={reply.date}
                                    onDeleteMessage={onDeleteMessage}
                                    replies={reply.repliesID}
                                    topic={reply.topic}
                                    currentUser={currentUser}
                                />
                            </li>
                        ))}
                    </ul>
                </>
            )}
            <ReplyMessage messageId={ident} currentUser={currentUser} />

            <DeleteMessage onDelete={handleDeleteMessage} messageId={ident} />
            </BrowserRouter>
        </div>
    );
}

export default Message;
