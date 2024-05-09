import React from 'react';
import '../styles/AdminApprovalList.css';

function AdminApprovalList({ usersToApprove, onApprove, onReject }) {
    return (
        <div className='admin-approval-list'>
            <h2>Approbation des utilisateurs</h2>
            <ul>
                {usersToApprove.map(user => (
                    <li key={user.userId}>
                        <div className='admin-approval-list-user'>
                            <p>ID de la demande d'inscription : {user._id}</p> {/*à ne pas confondre avec l'ID de l'utilisateur */}
                            <p>Prénom: {user.name}</p>
                            <p>Nom: {user.lastName}</p>
                            <p>Identifiant: {user.login}</p>
                            
                        
                        <button onClick={() => onApprove(user._id)}>Approuver</button>
                        <button onClick={() => onReject(user._id)}>Rejeter</button>
                        </div>
                    </li>
                    
                ))}
            </ul>
        </div>
    );
}

export default AdminApprovalList;
