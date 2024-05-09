import React from 'react';
import '../styles/AdminApprovalList.css';

function AdminApprovalList({ usersToApprove, onApprove, onReject }) {
    return (
        <div className='admin-approval-list'>
            <h2>Approbation des utilisateurs</h2>
            <ul>
                {usersToApprove.map(user => (
                    <li key={user.userId}>
                        
                            <p>ID de la demande d'inscription : <strong>{user._id}</strong></p> {/*à ne pas confondre avec l'ID de l'utilisateur */}
                            <p>Prénom: <strong>{user.name}</strong></p>
                            <p>Nom: <strong>{user.lastName}</strong></p>
                            <p>Identifiant: <strong>{user.login}</strong></p>
                            
                        
                        <button onClick={() => onApprove(user._id)}>Approuver</button>
                        <button onClick={() => onReject(user._id)}>Rejeter</button>
                        
                    </li>
                    
                ))}
            </ul>
        </div>
    );
}

export default AdminApprovalList;
