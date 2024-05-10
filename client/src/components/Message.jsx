import React, { useState } from 'react';
import '../styles/Message.css';
import DeleteMessage from './DeleteMessage';
import ReplyMessage from './ReplyMessage';
import RepliesList from './RepliesList';

function Message({ ident, author, content, date, onDeleteMessage, replies, topic }) {
    const [showReplies, setShowReplies] = useState(false);

    const handleToggleReplies = () => {
        setShowReplies(!showReplies);
    };

    const handleDeleteMessage = () => {
        onDeleteMessage(ident);
    };

    return (
        <li className='message-item'>
            <p>Le {date} : {author} a écrit "{content}" </p>
            <p>Topic : {topic}</p>

            <button onClick={handleToggleReplies}>Réponses</button>

            {showReplies && <RepliesList repliesIds={replies} />} {/* Passer les réponses au composant RepliesList en utilisant la prop repliesIds */}

            <ReplyMessage messageId={ident} currentUser={author} />

            <DeleteMessage onDelete={handleDeleteMessage} messageId={ident} />
        </li>
    );
}

export default Message;
