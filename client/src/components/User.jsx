import '../styles/User.css';

function User({ _id, name, lastName, login, email, isAdmin }) {
    return (
        <div className="user-info"> {/* Ajoutez la classe user-info ici */}
            <p>Informations sur l'utilisateur n° <b>{_id}</b></p>
            <p>Prénom : <b>{name}</b></p>
            <p>Nom : <b>{lastName}</b></p>
            <p>Identifiant : <b>{login}</b></p>
            <p>E-mail : <b>{email}</b></p>
            {isAdmin && <p>Statut : <b>Administrateur</b></p>}
        </div>
    );
}
export default User;
