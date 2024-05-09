import React, { useState } from 'react';
import axios from 'axios';

const ReplyMessage = ({ messageId, currentUser }) => {
    const [replyContent, setReplyContent] = useState('');

    const handleReply = async () => {
        try {
            await axios.post(`/api/messages/${messageId}/reply`, { content: replyContent, author: currentUser });
            // Gérer la réussite de la réponse si nécessaire
            setReplyContent(''); // Effacer le champ de réponse après avoir envoyé la réponse
        } catch (error) {
            console.error('Erreur lors de l\'envoi de la réponse :', error);
        }
    };

    return (
        <div>
            <textarea value={replyContent} onChange={(e) => setReplyContent(e.target.value)} placeholder="Répondre au message..." />
            <button onClick={handleReply}>Envoyer</button>
        </div>
    );
};

export default ReplyMessage;
