import '../styles/User.css';
import {BrowserRouter, Link} from "react-router-dom";

function User({ _id, name, lastName, login, email, isAdmin }) {
    return (
        <div className="user-info"> {/* Ajoutez la classe user-info ici */}
        <BrowserRouter forceRefresh ={true}>

            <p>Informations sur l'utilisateur n° <b>{_id}</b></p>
            <p>Prénom : <b>{name}</b></p>
            <p>Nom : <b>{lastName}</b></p>
            <p>Identifiant : <b>{login}</b></p>
            <p>E-mail : <b>{email}</b></p>
            {isAdmin && <p>Statut : <b>Administrateur</b></p>}
        </BrowserRouter>
        </div>
    );
}
export default User;
