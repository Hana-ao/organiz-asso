import React from 'react';
{/*import '../styles/AdminControls.css';*/}

function AdminControls({ onGrantAdmin, onRevokeAdmin }) {
    return (
        <div className='admin-controls'>
            <h2>Contrôles administratifs</h2>
            <button onClick={onGrantAdmin}>Accorder les droits d'administration</button>
            <button onClick={onRevokeAdmin}>Révoquer les droits d'administration</button>
        </div>
    );
}

export default AdminControls;
