import React from 'react';

function RepliesList({ repliesIds }) {
    return (
        <div>
            <h3>Replies:</h3>
            <ul>
                {repliesIds.map((reply, index) => (
                    <li key={index}>
                        <p>{reply.content}</p>
                        <p>Auteur : {reply.author}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default RepliesList;
